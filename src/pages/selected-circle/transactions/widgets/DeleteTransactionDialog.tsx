import { Transaction } from "@/models/API";
import { useState } from "react";
import {
  deleteTransactionEntry,
  resetTransactionState,
} from "@/pages/selected-circle/transactions/state/transaction/transactionOperations";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, LoaderCircleIcon, Trash2 } from "lucide-react";
import {
  SuccessNotification,
  ErrorNotification,
} from "@/components/Notification";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { eliminateTransaction } from "../state/transaction/transactionSlice";

function DeleteTransactionDialog({
  transaction,
}: {
  transaction: Transaction;
}) {
  const [open, setOpen] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [showErrorNotification, setShowErrorNotification] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.transactionOperations);

  const handleDelete = async () => {
    try {
      await dispatch(
        deleteTransactionEntry({
          id: transaction.id,
          adminID: transaction.adminID,
        })
      ).unwrap();
      setShowSuccessNotification(true);
    } catch (error) {
      setErrorMessage(
        typeof error === "string" ? error : "Failed to delete transaction"
      );
      setShowErrorNotification(true);
    }
  };

  const handleClose = () => {
    if (showSuccessNotification) {
      dispatch(eliminateTransaction(transaction.id));
    }
    setOpen(false);
    setShowSuccessNotification(false);
    setShowErrorNotification(false);
    setErrorMessage("");
  };
  const onOpenChange = (open: boolean) => {
    if (showSuccessNotification) {
      dispatch(eliminateTransaction(transaction.id));
    }
    if (open) {
      setOpen(true);
    } else {
      setOpen(false);
      setShowSuccessNotification(false);
      setShowErrorNotification(false);
      setErrorMessage("");
      dispatch(resetTransactionState());
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-red-100 dark:hover:bg-red-900/20 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-500"
        >
          <span className="sr-only">Delete</span>
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-md"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        {showSuccessNotification ? (
          <SuccessNotification
            onClose={handleClose}
            text="Transaction deleted successfully."
          />
        ) : showErrorNotification ? (
          <ErrorNotification onClose={handleClose} text={errorMessage} />
        ) : (
          <>
            <DialogHeader className="flex flex-col items-center gap-2">
              <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/20">
                <AlertTriangle className="size-6 text-red-600 dark:text-red-400" />
              </div>
              <DialogTitle className="text-xl">Delete Transaction</DialogTitle>
              <DialogDescription className="text-center">
                Are you sure you want to delete this transaction? This action
                cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="p-2">
              <div className="flex flex-col gap-2 border rounded-md p-3 bg-muted/40">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Amount:</span>
                  <span className="text-sm">{transaction.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Type:</span>
                  <span className="text-sm">{transaction.transactionType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Date:</span>
                  <span className="text-sm">
                    {new Date(transaction.dateTime).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            <DialogFooter className="sm:justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              {status === "deleting" ? (
                <Button disabled>
                  <LoaderCircleIcon
                    className="-ms-1 animate-spin"
                    size={16}
                    aria-hidden="true"
                  />
                  Button
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              )}
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default DeleteTransactionDialog;
