import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { Installment, Loan } from "@/models/API";
import { CircleAlert, Trash2 } from "lucide-react";
import { useEffect, useId, useMemo, useState, memo, useCallback } from "react";
import { LoaderCircle } from "lucide-react";
import {
  removeInstallment,
  resetInstallmentOperation,
} from "../state/installmentOperationSlice";
import {
  SuccessNotification,
  ErrorNotification,
} from "@/components/Notification";

interface DeleteInstallmentDialogProps {
  loan: Loan;
  installment: Installment;
  installmentsLength: number;
}

// Extracted dialog content component for better organization
const DialogStep1 = memo(function DialogStep1({
  id,
  inputValue,
  setInputValue,
  onSubmit,
  isLoading,
}: {
  id: string;
  inputValue: string;
  setInputValue: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}) {
  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border">
          <CircleAlert className="opacity-80" size={16} strokeWidth={2} />
        </div>
        <DialogHeader>
          <DialogTitle className="sm:text-center">
            Final confirmation
          </DialogTitle>
          <DialogDescription className="sm:text-center">
            This action cannot be undone. To confirm, please enter your{" "}
            <span className="text-foreground">Secret Password</span>.
          </DialogDescription>
        </DialogHeader>
      </div>
      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        autoComplete="off"
      >
        <div className="space-y-2">
          <Label htmlFor={id}>Secret Password</Label>
          <Input
            id={id}
            type="password"
            placeholder="Type Your Secret Password to confirm"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.trim())}
            autoComplete="new-password"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            data-form-type="other"
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline" className="flex-1">
              Cancel
            </Button>
          </DialogClose>
          <Button
            disabled={isLoading || inputValue === ""}
            type="submit"
            className="flex-1"
          >
            {isLoading ? (
              <>
                <LoaderCircle
                  className="-ms-1 me-2 animate-spin"
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                />
                Please wait...
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </DialogFooter>
      </form>
    </>
  );
});

const DeleteInstallmentDialog = memo(function DeleteInstallmentDialog({
  loan,
  installment,
  installmentsLength,
}: DeleteInstallmentDialogProps) {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector(
    (state) => state.installmentOperations
  );
  const { cashAccount } = useAppSelector((state) => state.closing);
  const id = useId();

  const [inputValue, setInputValue] = useState("");
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const installmentPaidDate = useMemo(
    () => new Date(installment.paidDate!),
    [installment.paidDate]
  );

  const lastClosingDate = useMemo(
    () => new Date(cashAccount?.closingEntryDate!),
    [cashAccount?.closingEntryDate]
  );

  const isDisabled = useMemo(
    () => installmentPaidDate < lastClosingDate || loan.status === "CLOSED",
    [installmentPaidDate, lastClosingDate, loan.status]
  );

  const handleSubmit = useCallback(() => {
    dispatch(
      removeInstallment({
        installment,
        installmentsLength,
        loan,
        password: inputValue,
      })
    );
  }, [dispatch, installment, installmentsLength, loan, inputValue]);

  const handleReset = useCallback(() => {
    setInputValue("");
    setStep(1);
    dispatch(resetInstallmentOperation());
  }, [dispatch]);

  // Handle dialog open/close
  const handleOpenChange = useCallback(
    (open: boolean) => {
      setIsOpen(open);
      if (!open) {
        handleReset();
        window.location.reload();
      }
    },
    [handleReset]
  );

  // Handle status changes
  useEffect(() => {
    if (isOpen && (status === "deleted" || status === "failed")) {
      setStep(2);
    }
  }, [status, isOpen]);

  // Cleanup when component unmounts or installment changes
  useEffect(() => {
    return () => {
      dispatch(resetInstallmentOperation());
    };
  }, [dispatch, installment.id]);

  if (isDisabled) {
    return (
      <Button
        size="icon"
        variant="ghost"
        disabled
        className="cursor-not-allowed"
      >
        <Trash2 size={20} />
      </Button>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Trash2 size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent onPointerDownOutside={(event) => event.preventDefault()}>
        {step === 1 ? (
          <DialogStep1
            id={id}
            inputValue={inputValue}
            setInputValue={setInputValue}
            onSubmit={handleSubmit}
            isLoading={status === "deleting"}
          />
        ) : status === "deleted" ? (
          <SuccessNotification text="Installment was Successfully Deleted" />
        ) : (
          <ErrorNotification
            text={`An error occurred while deleting the installment. ${error}`}
          />
        )}
      </DialogContent>
    </Dialog>
  );
});

export default DeleteInstallmentDialog;
