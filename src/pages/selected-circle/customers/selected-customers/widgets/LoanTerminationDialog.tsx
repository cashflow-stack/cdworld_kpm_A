import { useEffect, useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  InfoIcon,
  AlertTriangle,
  CheckCircle,
  CalendarIcon,
  MoveRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { getLoanStatus } from "../utils/loanStatus";
import { Separator } from "@/components/ui/separator";
import { InstallmentStatus, Loan, LoanStatus } from "@/models/API";
import {
  CurrencyFormatter,
  FormatCurrency,
  getFormattedDate,
} from "@/toolkit/helper/helperFunctions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/toolkit/store";
import { executeLoanClosure, resetCloseLoanState } from "../state/closeLoanSlice";
import { Input } from "@/components/ui/input";

export function LoanTerminationDialog({ loan }: { loan: Loan }) {
  const dispatch = useDispatch<AppDispatch>();
  const { status: closingStatus } = useSelector(
    (state: RootState) => state.loanClosing
  );

  const [isOpen, setIsOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [hideTopButtons, setHideTopButtons] = useState(false);
  const { status, message, additionalInfo, calculation } = getLoanStatus(loan);
  const formatPercent = (value: number) => `${(value / 12).toFixed(2)}`;
  const [password, setPassword] = useState("");
  const dialogContentRef = useRef<HTMLDivElement | null>(null);

  const getStatusColor = useCallback((status: InstallmentStatus) => {
    switch (status) {
      case InstallmentStatus.BUSINESSLOSS:
        return "text-rose-600";
      case InstallmentStatus.WRITEOFF:
        return "text-yellow-600";
      case InstallmentStatus.EXCESSPAYMENT:
      case InstallmentStatus.PAID:
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  }, []);

  const getStatusIcon = useCallback((status: InstallmentStatus) => {
    switch (status) {
      case InstallmentStatus.BUSINESSLOSS:
        return <AlertTriangle className="w-5 h-5 mr-2 text-rose-600" />;
      case InstallmentStatus.WRITEOFF:
        return <AlertTriangle className="w-5 h-5 mr-2 text-yellow-600" />;
      case InstallmentStatus.EXCESSPAYMENT:
      case InstallmentStatus.PAID:
        return <CheckCircle className="w-5 h-5 mr-2 text-green-600" />;
      default:
        return null;
    }
  }, []);

  useEffect(() => {
    if (closingStatus === "success") {
      setIsOpen(false);
      setShowConfirmation(false);
      setHideTopButtons(false);
    }
    if (closingStatus === "failed") {
      setPassword("");
      setShowConfirmation(false);
      setHideTopButtons(false);
    }
  }, [closingStatus]);

  const handleTerminate = useCallback(() => {
    if (showConfirmation) {
      dispatch(
        executeLoanClosure({
          loan: loan,
          password:
            status === InstallmentStatus.BUSINESSLOSS ||
            status === InstallmentStatus.WRITEOFF
              ? password
              : undefined,
        })
      );
    } else {
      setShowConfirmation(true);
      setHideTopButtons(true);
      dispatch(resetCloseLoanState());
      setTimeout(() => {
        if (dialogContentRef.current) {
          dialogContentRef.current.scrollTo({
            top: dialogContentRef.current.scrollHeight,
            behavior: "smooth",
          });
        }
      }, 0);
    }
  }, [showConfirmation, status, dispatch, loan, password]);

  const cancelTermination = () => {
    setShowConfirmation(false);
    setHideTopButtons(false);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          setShowConfirmation(false);
          setHideTopButtons(true);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          disabled={loan.status === LoanStatus.CLOSED}
          className={`w-full ${getStatusColor(status)}`}
        >
          Terminate Loan
        </Button>
      </DialogTrigger>
      <DialogContent
        ref={dialogContentRef}
        className="sm:max-w-[500px] w-[95vw] max-h-[90vh] overflow-y-auto"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">
            Loan Termination Consequences
          </DialogTitle>
          <DialogDescription className="flex items-center space-x-2 text-sm sm:text-base">
            <CalendarIcon className="w-4 h-4" />
            <span className="text-xs sm:text-sm">
              {getFormattedDate(loan.dateOfCreation, "short")}&nbsp;&nbsp;
              <MoveRight className="inline w-3 h-3 sm:w-4 sm:h-4" />
              &nbsp;&nbsp;
              {getFormattedDate(loan.updatedAt, "short")}&nbsp;(
              {calculation.loanDuration} Days)
            </span>
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <div
              className={`flex items-center w-full mb-2 font-bold font-lato text-xl ${getStatusColor(
                status
              )}`}
            >
              {getStatusIcon(status)}
              <span>{status}</span>
            </div>
            <p className="text-sm mb-2">{message}</p>
          </div>

          <div className="aspect-auto p-4 border rounded-md shadow-md">
            <div className="text-muted-foreground tracking-wide">
              {status === InstallmentStatus.EXCESSPAYMENT
                ? "Excess Payment:"
                : status === InstallmentStatus.WRITEOFF
                ? "Write-off Amount:"
                : status === InstallmentStatus.BUSINESSLOSS
                ? "Business Loss:"
                : "Interest Earned:"}
            </div>
            <div className="flex font-semibold items-center text-base text-muted-foreground">
              {CurrencyFormatter({
                amount: calculation.result,
                className: `${getStatusColor(
                  status
                )} font-lato font-bold text-3xl`,
              })}
              &nbsp;
              {status === InstallmentStatus.EXCESSPAYMENT
                ? `(${FormatCurrency(calculation.paidAmount).substring(
                    1
                  )} - ${FormatCurrency(
                    calculation.outstandingBalance
                  ).substring(1)})`
                : status === InstallmentStatus.WRITEOFF ||
                  status === InstallmentStatus.BUSINESSLOSS
                ? `(${FormatCurrency(calculation.outstandingBalance).substring(
                    1
                  )} - ${FormatCurrency(calculation.paidAmount).substring(1)})`
                : `(${FormatCurrency(calculation.paidAmount).substring(
                    1
                  )} - ${FormatCurrency(calculation.givenAmount).substring(
                    1
                  )})`}
            </div>
            <Separator className="my-2" />
            <div className="grid grid-cols-2 gap-2 px-2 text-sm">
              <div>Given Amount:</div>
              <div className="text-right font-semibold font-lato ">
                {CurrencyFormatter({ amount: calculation.givenAmount })}
              </div>
              <div>Total Outstanding:</div>
              <div className="text-right font-semibold font-lato">
                {CurrencyFormatter({
                  amount: calculation.outstandingBalance,
                })}
              </div>
              <div>Paid Amount:</div>
              <div className="text-right  font-semibold font-lato">
                {CurrencyFormatter({ amount: calculation.paidAmount })}
              </div>
              <div
                className={`${
                  status === InstallmentStatus.BUSINESSLOSS
                    ? "hidden"
                    : status === InstallmentStatus.WRITEOFF && "hidden"
                }`}
              >
                Interest Rate:
              </div>
              <div
                className={`text-right font-semibold font-sans ${
                  status === InstallmentStatus.BUSINESSLOSS
                    ? "hidden"
                    : status === InstallmentStatus.WRITEOFF && "hidden"
                }`}
              >
                &#8377;{formatPercent(calculation.interestPercentage)} (
                {calculation.interestPercentage.toFixed(2)}%)
              </div>
            </div>
          </div>

          <Alert
            className={`aspect-auto ${
              status === InstallmentStatus.PAID
                ? "hidden"
                : status === InstallmentStatus.EXCESSPAYMENT && "hidden"
            }`}
          >
            <InfoIcon size={20} />
            <AlertTitle className={`text-base sm:text-lg font-bold`}>
              Important Information
            </AlertTitle>
            <AlertDescription className="text-sm sm:text-base">
              {additionalInfo}
            </AlertDescription>
          </Alert>
        </div>
        <DialogFooter
          className={`flex flex-col sm:flex-row gap-2 ${
            hideTopButtons ? "hidden" : ""
          }`}
        >
          <Button
            variant="secondary"
            onClick={() => setIsOpen(false)}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            variant={showConfirmation ? "destructive" : "default"}
            onClick={handleTerminate}
            className="w-full sm:w-auto"
          >
            {showConfirmation ? (
              <>
                <AlertTriangle className="w-4 h-4 mr-2" />
                Confirm Termination
              </>
            ) : (
              "Terminate Loan"
            )}
          </Button>
        </DialogFooter>
        {showConfirmation && (
          <div className="mt-4 p-4 bg-red-100 border border-red-200 rounded-md">
            <p className="text-red-800 font-semibold mb-2">
              Are you sure you want to terminate this loan?
            </p>
            <p className="text-red-700 text-sm mb-4">
              This action is irreversible. Once terminated, you cannot reopen
              this loan, and it will be scheduled for deletion. The deletion
              process will be completed at a later time.
            </p>
            {(status === InstallmentStatus.BUSINESSLOSS ||
              status === InstallmentStatus.WRITEOFF) && (
              <div className="mb-4">
                <Input
                  type="password"
                  placeholder="Enter your password to confirm"
                  value={password}
                  autoComplete= "off"
                  onChange={(e) => setPassword(e.target.value)}
                  className={`mb-2 text-black font-semibold tracking-wide`}
                />
              </div>
            )}
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                disabled={closingStatus === "loading"}
                onClick={cancelTermination}
              >
                No, Cancel
              </Button>
              {closingStatus === "loading" ? (
                <Button disabled>
                  <Loader2 className="animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button
                  variant="destructive"
                  onClick={handleTerminate}
                  disabled={
                    (status === InstallmentStatus.BUSINESSLOSS ||
                      status === InstallmentStatus.WRITEOFF) &&
                    !password
                  }
                >
                  Yes, Terminate
                </Button>
              )}
            </div>
          </div>
        )}
        {closingStatus === "failed" && (
          <div className="flex items-center text-red-600 text-sm mt-1">
            <AlertCircle className="h-4 w-4 mr-1" />
            <span>Invalid password. Please check and try again.</span>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
