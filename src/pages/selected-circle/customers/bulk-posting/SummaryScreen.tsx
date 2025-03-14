import {
  Check,
  Calendar,
  Printer,
  XCircle,
  Loader2,
  BookOpenCheck,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  CurrencyFormatter,
  getFormattedDate,
  getInstallmentsType,
  formatYYYYDDMMToISOString,
} from "@/toolkit/helper/helperFunctions";
import { SimplifiedLoan } from "@/models/customModels/customModels";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/toolkit/store";
import {
  executeBulkPosting,
  resetPostingRequestState,
} from "./state/postingOperations";
import { printSimplifiedLoans } from "@/utils/printBulkPostingInstallments";

interface SummaryScreenProps {
  date: string;
  loans: SimplifiedLoan[];
  onClose: () => void;
}

export default function SummaryScreen({
  date,
  loans,
  onClose,
}: SummaryScreenProps) {
  const dispatch = useDispatch<AppDispatch>();
  const totalAmount = loans.reduce(
    (sum, loan) => sum + Number(loan.paidAmount),
    0
  );
  const { selectedCircle, member, admin } = useSelector(
    (state: RootState) => state.dataHelper
  );
  const { status, response, error } = useSelector(
    (state: RootState) => state.bulkPostingOperations
  );

  const handelconfirmPosting = () => {
    // convert the loans to the json format
    // send the loans to the backend
    const loansJson = JSON.stringify(loans, null, 2);
    dispatch(
      executeBulkPosting({
        adminId: admin?.id!,
        circleId: selectedCircle?.id!,
        circleDateofCreation: selectedCircle?.dateOfCreation!,
        agentId: member?.id || admin?.id!,
        agentName: member?.name || admin?.name!,
        agentPhoneNumber: member?.phoneNumber || admin?.phoneNumber!,
        currentDateTime: formatYYYYDDMMToISOString(date),
        installmentType: getInstallmentsType({ day: selectedCircle?.day! }),
        bulkLoanDetails: loansJson,
      })
    );
    // console.log(
    //   {
    //     adminId: admin?.id!,
    //     circleId: selectedCircle?.id!,
    //     circleDateofCreation: selectedCircle?.dateOfCreation!,
    //     agentId: member?.id || admin?.id!,
    //     agentName: member?.name || admin?.name!,
    //     agentPhoneNumber: member?.phoneNumber || admin?.phoneNumber!,
    //     currentDateTime: formatYYYYDDMMToISOString(date),
    //     installmentType: getInstallmentsType({ day: selectedCircle?.day! }),
    //     bulkLoanDetails: loansJson,
    //   }
    // );
  };

  const handelresultPosting = () => {
    onClose;
    dispatch(resetPostingRequestState());
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 bg-primary-foreground/90 bg-opacity-50 flex items-center justify-center py-4 z-50">
      {status === "loading" && (
        <div className="flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      )}
      {status === "failed" && (
        <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg transform transition-all animate-in slide-in-from-bottom-4 max-w-md mx-4">
          <div className="relative">
            <div className="absolute -inset-1 bg-red-500/30 rounded-full blur-lg animate-pulse" />
            <XCircle
              size={48}
              className="text-red-500 dark:text-red-400 relative animate-bounce"
            />
          </div>
          <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
            Posting Failed
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300 text-center">
            Failed to process any installments. Please try again.
          </p>
          <div className="mt-4 p-4 bg-red-100 dark:bg-red-900/30 rounded-lg">
            <p className="text-sm text-red-600 dark:text-red-300">
              Error: {error || "Unknown error occurred"}
            </p>
          </div>
          <Button
            className="mt-8 bg-red-500 hover:bg-red-600 text-white dark:bg-red-600 dark:hover:bg-red-700 transition-colors"
            onClick={handelresultPosting}
          >
            Close Window
          </Button>
        </div>
      )}
      {status === "success" && response?.isAllDataProcessed && (
        <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg transform transition-all animate-in slide-in-from-bottom-4 max-w-md mx-4">
          <div className="relative">
            <div className="absolute -inset-1 bg-green-500/30 rounded-full blur-lg animate-pulse" />
            <BookOpenCheck
              size={48}
              className="text-green-500 dark:text-green-400 relative animate-bounce"
            />
          </div>
          <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
            Posting Successful!
          </h2>
          <div className="mt-4 space-y-2 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              Successfully processed {response.processedCount} of{" "}
              {response.totalItems} installments
            </p>
            <p className="text-green-600 dark:text-green-400 font-semibold">
              Success Rate: {response.successRate}
            </p>
          </div>
          <Button
            className="mt-8 bg-green-500 hover:bg-green-600 text-white dark:bg-green-600 dark:hover:bg-green-700 transition-colors"
            onClick={handelresultPosting}
          >
            Close Window
          </Button>
        </div>
      )}
      {status === "success" && !response?.isAllDataProcessed && (
        <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg transform transition-all animate-in slide-in-from-bottom-4 max-w-md mx-4">
          <div className="relative">
            <div className="absolute -inset-1 bg-yellow-500/30 rounded-full blur-lg animate-pulse" />
            <AlertTriangle
              size={48}
              className="text-yellow-500 dark:text-yellow-400 relative animate-bounce"
            />
          </div>
          <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
            Partial Success
          </h2>
          <div className="mt-4 space-y-2 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              Processed {response?.processedCount} of {response?.totalItems}{" "}
              installments
            </p>
            <p className="text-yellow-600 dark:text-yellow-400">
              Failed entries: {response?.failedCount}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Success Rate: {response?.successRate}
            </p>
          </div>
          <div className="mt-4 p-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
            <p className="text-sm text-yellow-600 dark:text-yellow-300">
              Some installments could not be processed. Please check the failed
              entries and try again.
            </p>
          </div>
          <Button
            className="mt-8 bg-yellow-500 hover:bg-yellow-600 text-white dark:bg-yellow-600 dark:hover:bg-yellow-700 transition-colors"
            onClick={handelresultPosting}
          >
            Close Window
          </Button>
        </div>
      )}
      {status === "idle" && (
        <Card className="w-full max-w-6xl h-full backdrop-blur-xl">
          <CardHeader className="py-4">
            <div className="flex flex-col sm:flex-row justify-between items-center w-full space-y-4 sm:space-y-0">
              <div>
                <CardTitle>Installment Posting Summary</CardTitle>
                <CardDescription className="flex items-center text-muted-foreground gap-2 pt-1">
                  <Calendar size={16} />
                  {getFormattedDate(date)}
                </CardDescription>
              </div>
              <p className="text-lg font-sans sm:text-2xl text-muted-foreground">
                Total amount: &nbsp;
                {CurrencyFormatter({
                  amount: totalAmount,
                  className:
                    "text-primary font-semibold font-lato text-primary",
                })}
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-180px)] rounded-md border">
              <div className="flex justify-between items-center px-4 pt-4">
                <h2 className="text-muted-foreground font-sans font-semibold">
                  Installments: ({loans.length})
                </h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4">
                {loans.map((loan) => (
                  <div
                    className="aspect-auto py-2 rounded-lg bg-muted/50 text-center"
                    key={loan.loanId}
                  >
                    <p className="text-sm font-medium text-muted-foreground">
                      Loan ID: {loan.loanSerial}
                    </p>
                    <p className="text-xl font-semibold">
                      {CurrencyFormatter({
                        amount: Number(loan.paidAmount),
                        className: "font-semibold font-lato text-primary",
                      })}
                    </p>
                  </div>
                ))}
              </div>
              <ScrollBar />
            </ScrollArea>
          </CardContent>
          <CardFooter className="flex justify-between gap-4 w-full">
            <div className="flex gap-2">
              <Button variant="secondary" onClick={onClose}>
                Close
              </Button>
              <Button
                onClick={() => printSimplifiedLoans(loans, date)}
                size="icon"
                className="bg-amber-600 text-white hover:bg-amber-700"
              >
                <Printer size={20} />
              </Button>
            </div>
            <Button
              onClick={handelconfirmPosting}
              disabled={loans.length === 0}
              className="bg-green-600 text-white hover:bg-green-700"
            >
              <Check className="mr-2 h-4 w-4" /> Confirm Posting
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
