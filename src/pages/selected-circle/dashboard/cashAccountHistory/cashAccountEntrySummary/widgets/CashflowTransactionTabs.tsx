import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { memo } from "react";
import { TransactionType } from "@/models/API";
import { MoveDown, MoveUp } from "lucide-react";
import {
  CurrencyFormatter,
  getFormattedDate,
  getTimeFromISODateTime,
  isIncomeType,
} from "@/toolkit/helper/helperFunctions";
import { CashAccountEntrySummaryState } from "../state/cashAccountEntrySummarySlice";

export const CashflowTransactionTabs = memo(
  ({ ts }: { ts: CashAccountEntrySummaryState }) => {
    const items = [
      {
        id: "1",
        title: "Collection",
        transactions: ts.transactions?.filter(
          (t) => t.transactionType === TransactionType.REPAYMENT
        ),
      },
      {
        id: "2",
        title: "New Loans",
        transactions: ts.transactions?.filter(
          (t) => t.transactionType === TransactionType.LOAN
        ),
      },
      {
        id: "3",
        title: "Financial Adjustments",
        transactions: ts.transactions?.filter(
          (transaction) =>
            transaction.transactionType === TransactionType.BUSINESSLOSS ||
            transaction.transactionType === TransactionType.EXCESSPAYMENT ||
            transaction.transactionType === TransactionType.WRITEOFF
        ),
      },
      {
        id: "4",
        title: "Existing Loans",
        transactions: ts.transactions?.filter(
          (transaction) =>
            transaction.transactionType === TransactionType.EXISTSINGLOAN
        ),
      },
      {
        id: "5",
        title: "Other Transactions",
        transactions: ts.transactions?.filter(
          (transaction) =>
            transaction.transactionType !== TransactionType.REPAYMENT &&
            transaction.transactionType !== TransactionType.LOAN &&
            transaction.transactionType !== TransactionType.BUSINESSLOSS &&
            transaction.transactionType !== TransactionType.EXCESSPAYMENT &&
            transaction.transactionType !== TransactionType.WRITEOFF &&
            transaction.transactionType !== TransactionType.EXISTSINGLOAN &&
            transaction.transactionType !== TransactionType.EXCESSCOLLECTION &&
            transaction.transactionType !== TransactionType.DEFICIT
        ),
      },
      {
        id: "6",
        title: "Cash Adjustments",
        transactions: ts.transactions?.filter(
          (transaction) =>
            transaction.transactionType === TransactionType.EXCESSCOLLECTION ||
            transaction.transactionType === TransactionType.DEFICIT
        ),
      },
      {
        id: "7",
        title: "Deleted Transactions",
        transactions: ts.transactions?.filter(
          (transaction) =>
            transaction.transactionType === TransactionType.DELETE
        ),
      },
    ];
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold">
          Transactions({ts.transactions?.length})
        </h2>
        <Accordion
          type="single"
          collapsible
          className="w-full space-y-3"
          defaultValue="1"
        >
          {items.map((item) => (
            <AccordionItem
              value={item.id}
              key={item.id}
              className="rounded-lg border bg-background px-4 py-1"
            >
              <AccordionTrigger className="justify-start gap-3 py-2 text-[15px] leading-6 hover:no-underline [&>svg]:-order-1">
                {item.title}({item.transactions?.length})
              </AccordionTrigger>
              <AccordionContent className="pb-2 ps-7 text-muted-foreground">
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
                    {item.transactions?.map((transaction, index) => (
                      <TableRow key={index}>
                        <TableCell className="grid place-content-center place-items-center py-4">
                          {isIncomeType(transaction.transactionType, transaction.amount) ? (
                            <MoveUp className="h-6 w-6 text-green-500" />
                          ) : (
                            <MoveDown className="h-6 w-6 text-red-500" />
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col font-semibold">
                            {transaction.description}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {getFormattedDate(transaction.date)}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div
                            className={`flex text-lg gap-1 font-bold justify-center ${
                              isIncomeType(transaction.transactionType, transaction.amount)
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            <span>
                              {isIncomeType(transaction.transactionType, transaction.amount)
                                ? "+"
                                : "-"}
                            </span>
                            <span>
                              {CurrencyFormatter({
                                amount: transaction.amount,
                                className: "font-lato",
                              })}
                            </span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <span>
                              {getTimeFromISODateTime(transaction.date)}
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return JSON.stringify(prevProps.ts) === JSON.stringify(nextProps.ts);
  }
);

CashflowTransactionTabs.displayName = "CashflowTransactionTabs";
