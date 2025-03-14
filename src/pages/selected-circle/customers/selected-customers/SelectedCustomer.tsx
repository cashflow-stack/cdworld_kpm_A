import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AppDispatch, RootState } from "@/toolkit/store";
import { lazy, Suspense, useEffect, createContext, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoans } from "./state/loanSlice";
import { Loan, LoanStatus } from "@/models/API";
import { fetchInstallments } from "./state/installmentSlice";
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
  formatDateToDDMMYY,
  getFormattedDate,
} from "@/toolkit/helper/helperFunctions";

import { Progress } from "@/components/ui/progress";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  CheckCircle,
  BadgeCheck,
  CircleAlert,
  AlertTriangle,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { printInstallments } from "@/utils/printInstallments";
// import SummaryCard from "./widgets/SummaryCard";
import { LoanTerminationDialog } from "./widgets/LoanTerminationDialog";
import ModifyLoanOptions from "./widgets/ModifyLoanDialog";

const UpdateInstallmentDialog = lazy(
  () => import("./widgets/UpdateInstallmentDialog")
);
const DeleteInstallmentDialog = lazy(
  () => import("./widgets/DeleteInstallmentDialog")
);

const SelectedCustomerScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedCustomer: C } = useSelector(
    (state: RootState) => state.dataHelper
  );
  const { status: loanClosureStatus } = useSelector(
    (state: RootState) => state.loanClosing
  );

  useEffect(() => {
    // Run on initial render
    dispatch(fetchLoans({ customerID: C!.id, adminID: C!.adminID }));
  }, [dispatch, C]);

  useEffect(() => {
    // Run when loanClosureStatus changes to "success"
    if (loanClosureStatus === "success") {
      dispatch(fetchLoans({ customerID: C!.id, adminID: C!.adminID }));
    }
  }, [dispatch, loanClosureStatus, C]);

  return <SelectedCustomer defaultLoanID={C?.loanId!} />;
};

export default SelectedCustomerScreen;

type LoanContextType = {
  loan: Loan | null;
};
export const LoanContext = createContext<LoanContextType>({ loan: null });
export const useLoan = () => useContext(LoanContext);

function SelectedCustomer({ defaultLoanID }: { defaultLoanID?: string }) {
  const { status, loans } = useSelector((state: RootState) => state.loans);

  if (status === "loading") {
    <div className="space-y-4 w-full animate-pulse">
      <div className="h-10 w-72 bg-muted rounded-lg" />
      <div className="space-y-4">
        <div className="h-48 w-full bg-muted rounded-lg" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="h-24 bg-muted rounded-lg" />
            ))}
        </div>
        <div className="h-32 w-full bg-muted rounded-lg" />
      </div>
    </div>;
  } else if (status === "empty") {
    return <NoLoans />;
  }

  function loanStatus({ status }: { status: LoanStatus }) {
    switch (status) {
      case "ACTIVE":
        return (
          <span className="flex items-center">
            <BadgeCheck
              fill="#174EA6"
              size={24}
              className="text-blue-50 mr-2"
            />{" "}
            <span className="text-base sm:text-xl font-semibold font-lato">
              Active
            </span>
          </span>
        );
      case "CLOSED":
        return (
          <span className="flex items-center">
            <CheckCircle
              fill="green"
              size={24}
              className="text-green-50 mr-2"
            />
            <span className="text-base sm:text-xl font-semibold font-lato">
              Closed
            </span>
          </span>
        );
      case "UNDERREVIEW":
        return (
          <span className="flex items-center">
            <CircleAlert
              fill="#DD4808"
              size={24}
              className="text-orange-200 mr-2"
            />
            <span className="text-base sm:text-xl font-semibold font-lato">
              Under Review
            </span>
          </span>
        );
      default:
        return null;
    }
  }

  return (
    <div className="flex flex-col">
      <div className="container mt-2 p-0 sm:pr-8 sm:pl-8">
        <Tabs
          orientation="horizontal"
          defaultValue={defaultLoanID ? defaultLoanID : loans[0] && loans[0].id}
        >
          <ScrollArea className="w-72 sm:w-11/12">
            <TabsList className="m-1">
              {loans.map((loan) => (
                <TabsTrigger key={loan.id} value={loan.id}>
                  Loan ID: {loan.loanSerial}
                </TabsTrigger>
              ))}
            </TabsList>
            <ScrollBar orientation="horizontal" className="bg-primary" />
          </ScrollArea>
          {loans.map((loan) => (
            <TabsContent key={loan.id} value={loan.id}>
              <Card>
                <CardHeader className="flex flex-row justify-between items-start">
                  <div>
                    <CardTitle className="text-xl font-semibold flex items-center gap-2">
                      <span className="bg-primary/10 text-primary rounded-md py-0.5 px-2 font-lato">
                        #{loan.loanSerial}
                      </span>
                      <span className="text-base sm:text-lg text-muted-foreground">
                        Loan Details
                      </span>
                    </CardTitle>
                    <CardDescription className="text-sm pt-1">
                      {getFormattedDate(loan.dateOfCreation, "short")} &nbsp; →
                      &nbsp;
                      {getFormattedDate(loan.endDate, "short")}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    {loan.status !== LoanStatus.CLOSED && (
                      <div className="flex gap-2">
                        <LoanTerminationDialog loan={loan} />
                        <LoanContext.Provider value={{ loan }}>
                          <ModifyLoanOptions />
                        </LoanContext.Provider>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Status Cards */}
                  {loan.status === LoanStatus.CLOSED && (
                    <Card className="bg-green-800 rounded-sm space-x-2">
                      <CardHeader className="py-2">
                        <CardTitle className="flex items-center gap-2">
                          <CheckCircle />
                          {loan.reasonForLoanTermination}
                        </CardTitle>
                        <CardDescription>
                          <span className="flex flex-col text-sm text-green-100">
                            <span>
                              Closed Date:&nbsp;
                              <span className="text-base font-medium">
                                {getFormattedDate(loan.endDate)}
                              </span>
                            </span>
                            <span>
                              Total Amount:&nbsp;
                              <span className="text-base font-medium">
                                {CurrencyFormatter({
                                  amount: loan.paidAmount,
                                })}
                              </span>
                            </span>
                          </span>
                          <span className="text-yellow-400">
                            The loan deletion is scheduled for&nbsp;
                            <span className="text-base font-semibold">
                              {loan.expireAt
                                ? getFormattedDate(
                                    new Date(
                                      loan.expireAt * 1000
                                    ).toLocaleDateString()
                                  )
                                : "N/A"}
                            </span>
                          </span>
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  )}
                  {loan.status === LoanStatus.UNDERREVIEW && (
                    <Card className="bg-slate-700 rounded-sm space-x-2">
                      <CardHeader>
                        <CardTitle className="flex gap-2 items-center">
                          <Info />
                          This loan is under review
                        </CardTitle>
                        <CardDescription>
                          Please review the loan summary before closing the
                          loan.
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  )}
                  {loan.updatedDate && (
                    <Card className="bg-red-700 rounded-sm space-x-2">
                      <CardHeader className="py-2">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <AlertTriangle />
                          This loan has been modified
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm font-lato font-bold">
                          <span>Modified Date: </span>
                          <span className="text-base text-color-600 px-2">
                            {formatDateToDDMMYY(loan.updatedDate)}
                          </span>
                        </div>
                        <div className="text-sm font-lato font-bold">
                          <span>Initial Collection Amount: </span>
                          <span>
                            {loan.initialCollectibleAmount &&
                              CurrencyFormatter({
                                amount: loan.initialCollectibleAmount,
                                className:
                                  "font-bold font-lato tracking-wide text-base px-2",
                              })}
                          </span>
                        </div>
                        <div className="text-sm font-lato font-bold">
                          <span>Initial Paid Amount: </span>
                          <span>
                            {loan.initialGivenAmount &&
                              CurrencyFormatter({
                                amount: loan.initialGivenAmount,
                                className:
                                  "font-bold font-lato tracking-wide text-base px-2",
                              })}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  {/* Key Metrics */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card className="bg-brand">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base sm:text-lg text-lime-950/70">
                          Outstanding Balance
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-xl sm:text-4xl font-extrabold text-gray-900">
                          {CurrencyFormatter({
                            amount: loan.collectibleAmount - loan.paidAmount,
                            className: "font-lato",
                          })}
                        </div>
                        <Progress
                          variant="brand"
                          value={
                            (loan.paidAmount / loan.collectibleAmount) * 100
                          }
                          className="h-3 sm:h-4 my-2 bg-neutral-500/50"
                        />
                        <div className="text-xs sm:text-sm grid grid-cols-2 gap-2">
                          <div className="text-left text-gray-800 font-bold text-base">
                            Paid:{" "}
                            {CurrencyFormatter({
                              amount: loan.paidAmount,
                              className: "font-lato",
                            })}
                          </div>
                          <div className="text-right text-gray-800 font-bold text-base">
                            Total:{" "}
                            {CurrencyFormatter({
                              amount: loan.collectibleAmount,
                              className: "font-lato",
                            })}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base sm:text-lg">
                          Payment Details
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex justify-between">
                          <span>Installment Amount:</span>
                          <span className="font-bold font-lato">
                            {CurrencyFormatter({
                              amount: loan.installmentAmount,
                            })}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Installments Completed:</span>
                          <span className="font-bold font-lato">
                            {loan.paidInstallments} of {loan.totalInstallments}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base sm:text-lg">
                          Loan Summary
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex justify-between items-center pb-2 border-b">
                          <span>Status:</span>
                          <span>{loanStatus({ status: loan.status })}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Given Amount:</span>
                          <span className="font-bold font-lato">
                            {CurrencyFormatter({ amount: loan.givenAmount })}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Collectible Amount:</span>
                          <span className="font-bold font-lato">
                            {CurrencyFormatter({
                              amount: loan.collectibleAmount,
                            })}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  {/* Installments Table */}
                  <InstallmentsTable loan={loan} />
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}

//! Installments Table
function InstallmentsTable({ loan }: { loan: Loan }) {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchInstallments({ loanID: loan.id, adminID: loan.adminID }));
  }, [dispatch, loan]);
  const { status, installments } = useSelector(
    (state: RootState) => state.installments
  );
  if (status === "success") {
    return (
      <Card>
        <div className="p-7 flex justify-between items-center">
          <div>
            <CardTitle>Installments</CardTitle>
            <CardDescription>
              Installments data for the selected loan.
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => printInstallments(loan, installments)}
            className="flex items-center gap-1"
          >
            <Printer size={16} />
            Print
          </Button>
        </div>
        <CardContent>
          <ScrollArea className="h-[600px] rounded-md border">
            <div className="min-w-[800px]">
              <Table>
                <TableHeader>
                  <TableRow className="w-full">
                    <TableHead>No.</TableHead>
                    <TableHead className="min-w-20">Due Date</TableHead>
                    <TableHead className="min-w-24">Paid Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Updated Date</TableHead>
                    <TableHead>Initial Amount</TableHead>
                    <TableHead>Agent Name</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {installments.map((installment, index) => (
                    <TableRow
                      key={installment.id}
                      className={index % 2 === 0 ? "bg-accent/75" : ""}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        {formatDateToDDMMYY(installment.dueDate)}
                      </TableCell>
                      <TableCell>
                        {formatDateToDDMMYY(installment.paidDate)}
                      </TableCell>
                      <TableCell className="flex items-center gap-2">
                        {installment.paidAmount &&
                          CurrencyFormatter({
                            amount: installment.paidAmount,
                            className:
                              "font-lato font-semibold tracking-wider text-lg text-green-600",
                          })}
                        <Suspense fallback={<div>Loading...</div>}>
                          <UpdateInstallmentDialog
                            installment={installment}
                            loan={loan}
                            allInstallments={installments}
                          />
                          <DeleteInstallmentDialog
                            installment={installment}
                            loan={loan}
                            installmentsLength={installments.length}
                          />
                        </Suspense>
                      </TableCell>
                      <TableCell
                        className={`${
                          installment.initialAmount && "bg-red-300"
                        } text-red-600 font-bold`}
                      >
                        {formatDateToDDMMYY(installment.updatedDate)}
                      </TableCell>
                      <TableCell
                        className={`${
                          installment.initialAmount && "bg-red-300"
                        }`}
                      >
                        {installment.initialAmount &&
                          CurrencyFormatter({
                            amount: installment.initialAmount,
                            className:
                              "font-lato font-bold tracking-wider text-red-600",
                          })}
                      </TableCell>
                      <TableCell>
                        {installment.collectionAgentDetails?.name}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardContent>
      </Card>
    );
  } else if (status === "empty") {
    return <div>No Installments</div>;
  } else if (status === "failed") {
    return <div>Error loading installments</div>;
  }
  return <div>Loading...</div>;
}

function NoLoans() {
  return (
    <div className="flex items-center justify-center min-h-[300px]">
      <Card className="p-8 shadow-lg border max-w-md">
        <div className="flex flex-col items-center">
          <BadgeCheck fill="green" size={48} className="mb-4" />
          <CardTitle className="text-2xl font-bold mb-2">
            No Loans Found
          </CardTitle>
          <CardDescription className="text-center text-base text-muted-foreground">
            There are currently no loans to display. Please check back later or
            create a new loan.
          </CardDescription>
        </div>
      </Card>
    </div>
  );
}
