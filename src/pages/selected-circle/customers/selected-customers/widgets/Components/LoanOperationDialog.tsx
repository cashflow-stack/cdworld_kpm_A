import {
  DialogContent,
  DialogOverlay,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import loanMenuOptions from "@/constants/loanMoreOptions";
import { useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CircleAlertIcon, LoaderCircle } from "lucide-react";
import { useId, useState } from "react";
import { useLoan } from "../../SelectedCustomer";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  SuccessNotification,
  ErrorNotification,
} from "@/components/Notification";
import {
  executeLoanRemoval,
  resetLoanOperation,
} from "../../state/loanOperationSlice";
import { deleteLoanData } from "../../state/loanSlice";

export function LoanOperationDialog({ selected }: { selected: string }) {
  const transactionForm = useMemo(() => {
    switch (selected) {
      case loanMenuOptions.UPDATELOAN:
        break;
      case loanMenuOptions.DELETELOAN:
        return <LoanRemovalConfirmation />;
      default:
        return null;
    }
  }, [selected]);

  return (
    <>
      <DialogOverlay />
      <DialogContent onPointerDownOutside={(e) => e.preventDefault()}>
        {transactionForm}
      </DialogContent>
    </>
  );
}

function LoanRemovalConfirmation() {
  const id = useId();
  const [inputValue, setInputValue] = useState("");
  const [step, setStep] = useState(1);
  const dispatch = useAppDispatch();
  const { loan } = useLoan();
  const { status, error } = useAppSelector((state) => state.loanOperations);
  const { member, admin, selectedCircle } = useAppSelector(
    (state) => state.dataHelper
  );

  const handleSubmit = () => {
    if (loan === null) return;
    dispatch(
      executeLoanRemoval({
        loan: loan,
        password: inputValue,
        circleId: selectedCircle?.id!,
        memberId: member?.id ?? admin?.id!,
        memberName: member?.name ?? admin?.name!,
      })
    );
  };

  const restoreDefaultValues = (error?: boolean) => {
    dispatch(resetLoanOperation());
    setInputValue("");
    if (error) return;
    dispatch(deleteLoanData(loan?.id!));
  };

  useEffect(() => {
    if (status === "deleted" || status === "failed") {
      setStep(2);
    }
  }, [status]);

  if (step === 2) {
    return status === "deleted" ? (
      <SuccessNotification
        onClose={() => restoreDefaultValues()}
        text="Loan was Successfully Deleted"
      />
    ) : (
      <ErrorNotification
        onClose={() => restoreDefaultValues(true)}
        text={`An error occurred while deleting the loan. ${error}`}
      />
    );
  }

  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <div
          className="flex size-9 shrink-0 items-center justify-center rounded-full border"
          aria-hidden="true"
        >
          <CircleAlertIcon className="opacity-80" size={16} />
        </div>
        <DialogHeader>
          <DialogTitle className="sm:text-center">Delete Loan</DialogTitle>
          <DialogDescription className="sm:text-center">
            This is a permanent deletion that cannot be reversed. Please enter
            the <span className="text-foreground">Secret Password</span> to
            proceed.
          </DialogDescription>
        </DialogHeader>
      </div>

      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="*:not-first:mt-2">
          <Label htmlFor={id}>Secret Password</Label>
          <Input
            id={id}
            placeholder="Type Your Secret Password to confirm"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.trim())}
            type="password"
            autoComplete="new-password"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            data-form-type="other"
            className="mt-2"
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline" className="flex-1">
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            className="flex-1"
            disabled={status === "deleting" || inputValue === ""}
          >
            {status === "deleting" ? (
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
}
