import {
  useEffect,
  useState,
  useCallback,
  useMemo,
  memo,
  Suspense,
} from "react";
import {
  ArrowDownUp,
  Bolt,
  FileSpreadsheet,
  HandCoins,
  MoreVertical,
  MoveDown,
  MoveUp,
  Trash2,
  Wrench,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EndDatePicker } from "./widgets/EndDatePicker";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CurrencyFormatter,
  getFormattedDate,
  getTimeFromISODateTime,
  isIncomeType,
} from "@/toolkit/helper/helperFunctions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/toolkit/store";
import {
  fetchTransactions,
  TransactionState,
} from "./state/transaction/transactionSlice";
import { TransactionType } from "@/models/API";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import transactionOptions from "@/constants/transactionOptions";
import TransactionsLoader from "./widgets/TransactionsLoader";
import ClosingSummaryDialog from "./widgets/ClosingSummary";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TransactionForm } from "./widgets/forms/CreateTransactionForm";
import { UpdateTransaction } from "./widgets/forms/UpdateTransactionsForm";
import GenerateDocument from "./pdf/GeneratePdf";
import { CashBagSummary } from "@/components/cash-bag-summary/CashBagSummary";
import { FinancialActivities } from "@/components/financial-activities/FinancialActivities";
import DeleteTransactionDialog from "./widgets/DeleteTransactionDialog";

const Transactions = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { selectedCircle } = useSelector(
    (state: RootState) => state.dataHelper
  );

  useEffect(() => {
    if (selectedCircle) {
      dispatch(
        fetchTransactions({
          selectedCircleID: selectedCircle?.id,
        })
      );
    }
  }, [selectedCircle, dispatch]);
  return <TransactionsScreen />;
};

export default Transactions;

const TransactionsScreen = () => {
  const ts = useSelector((state: RootState) => state.transactions);
  const [showSummary, setShowSummary] = useState(false);
  const handelShowSummary = useCallback(
    (value: boolean) => {
      setShowSummary(value);
    },
    [showSummary]
  );

  if (ts.status === "success") {
    return (
      <div className="flex flex-wrap flex-col">
        <div className="flex items-center flex-wrap sm:mx-5 my-2 justify-between">
          <h2 className="text-xl my-2 ml-5 sm:ml-0 sm:my-0 font-semibold">
            Cashflow Overview
          </h2>
          <EndDatePicker />
        </div>
        <div className="flex flex-col sm:gap-4 py-4">
          <div className="grid items-start gap-4 sm:px-6 lg:grid-cols-3">
            <div className="md:gap-8 lg:col-span-2">
              <CurrentTransactions ts={ts} />
            </div>
            <div className="mx-4 sm:mx-0">
              {/* //! <!-- CASH BAG SUMMARY --> */}
              <CashBagSummary
                capital={ts.capital}
                collectionAmount={ts.collectionAmount}
                newLoanPayments={ts.newLoanPayments}
                assumedCapital={ts.assumedCapital}
                range={ts.range}
              >
                <GenerateDocument />
                <TransactionOptions />
              </CashBagSummary>

              {/* //! <!-- CLOSING SUMMARY --> */}
              <Button
                onClick={() => handelShowSummary(true)}
                variant={"default"}
                className="mt-4 sm:mt-8 h-10 font-semibold w-full shadow-xl"
              >
                <FileSpreadsheet className="mr-2" size={20} />
                Closing Statement of {getFormattedDate(ts.range[1], "short")}
              </Button>

              {/* //! <!-- FINANCIAL ACTIVITES --> */}

              <div className="mt-2 sm:mt-8">
                <FinancialActivities data={ts} />
              </div>
            </div>
          </div>
        </div>
        {showSummary && (
          <Suspense fallback={<div>Loading...</div>}>
            <ClosingSummaryDialog onClose={() => setShowSummary(false)} />
          </Suspense>
        )}
      </div>
    );
  } else if (ts.status === "failed") {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">
            Failed to load transactions
          </h2>
          <p className="text-muted-foreground">
            {ts.error || "An error occurred while loading transactions"}
          </p>
        </div>
      </div>
    );
  }
  return <TransactionsLoader />;
};

const TransactionOptions = memo(() => {
  const [selected, setSelected] = useState<string>("");

  const handleSelect = useCallback((option: string) => {
    setSelected(option);
  }, []);

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <MoreVertical className="h-4 w-4" />
            <span className="sr-only">More options</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="left"
          className="w-56 flex flex-col gap-2 p-2"
        >
          <DialogTrigger asChild>
            <DropdownMenuItem
              onSelect={() => handleSelect(transactionOptions.DAYCAPTIAL)}
            >
              Day Captial
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogTrigger asChild>
            <DropdownMenuItem
              onSelect={() => handleSelect(transactionOptions.VEHICLEEXPENSE)}
            >
              Vehicle Expanse
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem
              onSelect={() => handleSelect(transactionOptions.MEMBEREXPENSE)}
            >
              Member Expanses
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogTrigger asChild>
            <DropdownMenuItem
              onSelect={() =>
                handleSelect(transactionOptions.PARTNERINVESTMENT)
              }
            >
              Investments
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem
              disabled
              onSelect={() => handleSelect(transactionOptions.TRANSFER)}
            >
              Transfer
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogTrigger asChild>
            <DropdownMenuItem
              onSelect={() => handleSelect(transactionOptions.OTHERS)}
            >
              Circle Income/Expense
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem
              onSelect={() => handleSelect(transactionOptions.WITHDRAWAL)}
            >
              Withdrawal
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogTrigger asChild>
            <DropdownMenuItem
              onSelect={() => handleSelect(transactionOptions.CASHADJUSTMENT)}
            >
              Cash Adjustment
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <TransactionForm selected={selected} />
    </Dialog>
  );
});

const CurrentTransactions = memo(({ ts }: { ts: TransactionState }) => {
  const repaymentTransactions = useMemo(
    () =>
      ts.transactions.filter(
        (transaction) =>
          transaction.transactionType === TransactionType.REPAYMENT
      ),
    [ts.transactions]
  );

  const loanTransactions = useMemo(
    () =>
      ts.transactions.filter(
        (transaction) => transaction.transactionType === TransactionType.LOAN
      ),
    [ts.transactions]
  );

  const otherTransactions = useMemo(
    () =>
      ts.transactions.filter(
        (transaction) =>
          transaction.transactionType !== TransactionType.REPAYMENT &&
          transaction.transactionType !== TransactionType.LOAN &&
          transaction.transactionType !== TransactionType.BUSINESSLOSS &&
          transaction.transactionType !== TransactionType.EXCESSPAYMENT &&
          transaction.transactionType !== TransactionType.WRITEOFF &&
          transaction.transactionType !== TransactionType.EXISTSINGLOAN &&
          transaction.transactionType !== TransactionType.EXCESSCOLLECTION &&
          transaction.transactionType !== TransactionType.DEFICIT &&
          transaction.transactionType !== TransactionType.DELETE
      ),
    [ts.transactions]
  );

  const financialAdjustments = useMemo(
    () =>
      ts.transactions.filter(
        (transaction) =>
          transaction.transactionType === TransactionType.BUSINESSLOSS ||
          transaction.transactionType === TransactionType.EXCESSPAYMENT ||
          transaction.transactionType === TransactionType.WRITEOFF
      ),
    [ts.transactions]
  );

  const deletedTransactions = useMemo(
    () =>
      ts.transactions.filter(
        (transaction) => transaction.transactionType === TransactionType.DELETE
      ),
    [ts.transactions]
  );

  const cashAdjustments = useMemo(
    () =>
      ts.transactions.filter(
        (transaction) =>
          transaction.transactionType === TransactionType.EXCESSCOLLECTION ||
          transaction.transactionType === TransactionType.DEFICIT
      ),
    [ts.transactions]
  );

  const oldLoansOutstanding = useMemo(
    () =>
      ts.transactions.filter(
        (transaction) =>
          transaction.transactionType === TransactionType.EXISTSINGLOAN
      ),
    [ts.transactions]
  );

  return (
    <div className="rounded-lg bg-card">
      {ts.transactions.length === 0 ? (
        <div className="flex items-center py-6 justify-center h-full">
          <div className="text-center">
            <h2 className="text-2xl font-semibold">No Transactions</h2>
            <p className="text-muted-foreground">
              No transactions have been made today
            </p>
          </div>
        </div>
      ) : (
        <Accordion type="single" collapsible defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-bold rounded-t-lg text-lg sm:px-2">
              <div className="flex gap-2 items-center">
                <MoveUp className="h-6 w-6 text-green-500" />
                Collection Transactions({repaymentTransactions.length})
              </div>
            </AccordionTrigger>
            <AccordionContent className="max-h-96 overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px] text-center">
                      Type
                    </TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="w-[150px] text-center">
                      Amount
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {repaymentTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="grid place-content-center place-items-center py-4">
                        {isIncomeType(transaction.transactionType) ? (
                          <MoveUp className="h-6 w-6 text-green-500" />
                        ) : (
                          <MoveDown className="h-6 w-6 text-red-500" />
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col font-semibold">
                          {transaction.additionalInfo.description}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {getFormattedDate(transaction.dateTime)}
                          &nbsp;|&nbsp;
                          {transaction.additionalInfo.transactionEvent}
                          &nbsp;|&nbsp;
                          <span>{transaction.additionalInfo.city}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex text-lg gap-1 font-bold justify-center">
                          <span>
                            {isIncomeType(transaction.transactionType)
                              ? "+"
                              : "-"}
                          </span>
                          <span>
                            {CurrencyFormatter({
                              amount: transaction.amount,
                            })}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <span>
                            {getTimeFromISODateTime(transaction.dateTime)}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="font-bold text-lg sm:px-2">
              <div className="flex gap-2 items-center">
                <MoveDown className="h-6 w-6 text-red-500" />
                New Loan Transactions({loanTransactions.length})
              </div>
            </AccordionTrigger>
            <AccordionContent className="max-h-96 overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px] text-center">
                      Type
                    </TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="w-[150px] text-center">
                      Amount
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loanTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="grid place-content-center place-items-center py-4">
                        {isIncomeType(transaction.transactionType) ? (
                          <MoveUp className="h-6 w-6 text-green-500" />
                        ) : (
                          <MoveDown className="h-6 w-6 text-red-500" />
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col font-semibold">
                          {transaction.additionalInfo.description}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {getFormattedDate(transaction.dateTime)}
                          &nbsp;|&nbsp;
                          {transaction.additionalInfo.loanSerial}
                          &nbsp;|&nbsp;
                          <span>{transaction.additionalInfo.city}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex text-lg gap-1 font-bold justify-center">
                          <span>
                            {isIncomeType(transaction.transactionType)
                              ? "+"
                              : "-"}
                          </span>
                          <span>
                            {CurrencyFormatter({
                              amount: transaction.amount,
                            })}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <span>
                            {getTimeFromISODateTime(transaction.dateTime)}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="font-bold text-lg rounded-b-lg sm:px-2">
              <div className="flex gap-2 items-center">
                <Wrench className=" text-fuchsia-600" size={20} />
                Financial Adjustments({financialAdjustments.length})
              </div>
            </AccordionTrigger>
            <AccordionContent className="max-h-96 overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px] text-center">
                      Type
                    </TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="w-[150px] text-center">
                      Amount
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {financialAdjustments.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="grid place-content-center place-items-center py-4">
                        {isIncomeType(transaction.transactionType) ? (
                          <MoveUp className="h-6 w-6 text-green-500" />
                        ) : (
                          <MoveDown className="h-6 w-6 text-red-500" />
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col font-semibold">
                          {transaction.additionalInfo.description}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {getFormattedDate(transaction.dateTime)}
                          &nbsp;|&nbsp;
                          {transaction.additionalInfo.loanSerial}
                          &nbsp;|&nbsp;
                          <span>{transaction.additionalInfo.city}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex text-lg gap-1 font-bold justify-center">
                          <span>
                            {isIncomeType(transaction.transactionType)
                              ? "+"
                              : "-"}
                          </span>
                          <span>
                            {CurrencyFormatter({
                              amount: transaction.amount,
                            })}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <span>
                            {getTimeFromISODateTime(transaction.dateTime)}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="font-bold text-lg rounded-b-lg sm:px-2">
              <div className="flex gap-2 items-center">
                <HandCoins className="text-sky-500" size={20} />
                Existing Loans ({oldLoansOutstanding.length})
              </div>
            </AccordionTrigger>
            <AccordionContent className="max-h-96 overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px] text-center">
                      Type
                    </TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="w-[150px] text-center">
                      Amount
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {oldLoansOutstanding.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="grid place-content-center place-items-center py-4">
                        {isIncomeType(transaction.transactionType) ? (
                          <MoveUp className="h-6 w-6 text-green-500" />
                        ) : (
                          <MoveDown className="h-6 w-6 text-red-500" />
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col font-semibold">
                          {transaction.additionalInfo.description}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {getFormattedDate(transaction.dateTime)}
                          &nbsp;|&nbsp;
                          {transaction.additionalInfo.loanSerial}
                          &nbsp;|&nbsp;
                          <span>{transaction.additionalInfo.city}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex text-lg gap-1 font-bold justify-center">
                          <span>
                            {isIncomeType(transaction.transactionType)
                              ? "+"
                              : "-"}
                          </span>
                          <span>
                            {CurrencyFormatter({
                              amount: transaction.amount,
                            })}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <span>
                            {getTimeFromISODateTime(transaction.dateTime)}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className="font-bold text-lg sm:px-2">
              <div className="flex gap-2 items-center">
                <ArrowDownUp className="h-6 w-6 text-indigo-500" />
                Circle Income/Expense({otherTransactions.length})
              </div>
            </AccordionTrigger>
            <AccordionContent className="max-h-96 overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px] text-center">
                      Type
                    </TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="w-[150px] text-center">
                      Amount
                    </TableHead>
                    <TableHead className="w-[100px] text-center">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {otherTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="grid place-content-center place-items-center py-4">
                        {isIncomeType(transaction.transactionType) ? (
                          <MoveUp className="h-6 w-6 text-green-500" />
                        ) : (
                          <MoveDown className="h-6 w-6 text-red-500" />
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col font-semibold">
                          {transaction.additionalInfo.description}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {getFormattedDate(transaction.dateTime)}
                          &nbsp;|&nbsp;
                          {transaction.additionalInfo.memberName}
                          &nbsp;|&nbsp;
                          <span>{transaction.transactionType}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex text-lg gap-1 font-bold justify-center">
                          <span>
                            {isIncomeType(transaction.transactionType)
                              ? "+"
                              : "-"}
                          </span>
                          <span>
                            {CurrencyFormatter({
                              amount: transaction.amount,
                            })}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <span>
                            {getTimeFromISODateTime(transaction.dateTime)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <UpdateTransaction transaction={transaction} />
                        &nbsp;
                        <DeleteTransactionDialog transaction={transaction} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger className="font-bold text-lg sm:px-2">
              <div className="flex gap-2 items-center">
                <Bolt className="text-violet-500" size={20} />
                Cash Adjustment({cashAdjustments.length})
              </div>
            </AccordionTrigger>
            <AccordionContent className="max-h-96 overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px] text-center">
                      Type
                    </TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="w-[150px] text-center">
                      Amount
                    </TableHead>
                    <TableHead className="w-[100px] text-center">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cashAdjustments.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="grid place-content-center place-items-center py-4">
                        {isIncomeType(transaction.transactionType) ? (
                          <MoveUp className="h-6 w-6 text-green-500" />
                        ) : (
                          <MoveDown className="h-6 w-6 text-red-500" />
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col font-semibold">
                          {transaction.additionalInfo.description}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {getFormattedDate(transaction.dateTime)}
                          &nbsp;|&nbsp;
                          {transaction.additionalInfo.memberName}
                          &nbsp;|&nbsp;
                          <span>{transaction.transactionType}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex text-lg gap-1 font-bold justify-center">
                          <span>
                            {isIncomeType(transaction.transactionType)
                              ? "+"
                              : "-"}
                          </span>
                          <span>
                            {CurrencyFormatter({
                              amount: transaction.amount,
                            })}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <span>
                            {getTimeFromISODateTime(transaction.dateTime)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="grid place-content-center place-items-center gap-1">
                        <UpdateTransaction transaction={transaction} />
                        <DeleteTransactionDialog transaction={transaction} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-7">
            <AccordionTrigger className="font-bold text-lg sm:px-2">
              <div className="flex gap-2 items-center">
                <Trash2 className="text-red-500" size={20} />
                Deleted Transactions({deletedTransactions.length})
              </div>
            </AccordionTrigger>
            <AccordionContent className="max-h-96 overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px] text-center">
                      Type
                    </TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="w-[150px] text-center">
                      Amount
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {deletedTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="grid place-content-center place-items-center py-4">
                        {transaction.amount <= 0 ? (
                          <MoveUp className="h-6 w-6 text-green-500" />
                        ) : (
                          <MoveDown className="h-6 w-6 text-red-500" />
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col font-semibold">
                          {transaction.additionalInfo.description}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {getFormattedDate(transaction.dateTime, "short")}
                          &nbsp;|&nbsp; Deleted by:&nbsp;
                          {transaction.additionalInfo.memberName}
                          &nbsp;|&nbsp; Outstanding:&nbsp;
                          <span className="text-red-500 font-semibold">
                            {transaction.additionalInfo.totalOutstandingAmount?.toLocaleString(
                              "en-IN"
                            )}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex text-lg gap-1 font-bold justify-center">
                          <span>{transaction.amount <= 0 ? "+" : "-"}</span>
                          <span>
                            {CurrencyFormatter({
                              amount: Math.abs(transaction.amount),
                            })}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <span>
                            {getTimeFromISODateTime(transaction.dateTime)}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
});
