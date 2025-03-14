import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogOverlay,
} from "@/components/ui/dialog";
import { useMemo, useState, useEffect } from "react";
import customerOptions from "@/constants/customerMoreOptions";
import { useContext } from "react";
import { CustomerOptionsContext } from "@/context/appContexts";
import { UpdateCustomerForm } from "./updateCustomerForm";
import {
  ErrorNotification,
  SuccessNotification,
} from "@/components/Notification";

export default function MoreOptionsDialogs({ selected }: { selected: string }) {
  const customerForm = useMemo(() => {
    switch (selected) {
      case customerOptions.UPDATECUSTOMER:
        return <UpdateCustomerDialog />;
      case customerOptions.UPDATELOAN:
        return <UpdateCustomerDialog />;
      case customerOptions.ADDITIONALLOAN:
        return <UpdateCustomerDialog />;
      default:
        return <UpdateCustomerDialog />;
    }
  }, [selected]);
  return (
    <>
      <DialogOverlay />
      <DialogContent onPointerDownOutside={(e) => e.preventDefault()}>
        {customerForm}
      </DialogContent>
    </>
  );
}

type DialogStep = 1 | 2;
type NotificationStatus = "success" | "failed";

export function UpdateCustomerDialog() {
  const { currentCustomer } = useContext(CustomerOptionsContext);
  const [step, setStep] = useState<DialogStep>(1);
  const [status, setStatus] = useState<NotificationStatus | null>(null);

  useEffect(() => {
    // Cleanup function
    return () => {
      setStep(1);
      setStatus(null);
    };
  }, []);

  // Guard clause for missing customer context
  if (!currentCustomer) {
    return (
      <DialogContent>
        <ErrorNotification text="Customer information not found" />
      </DialogContent>
    );
  }

  const handleFormSubmission = (submissionStatus: NotificationStatus) => {
    setStatus(submissionStatus);
    setStep(2);
  };

  return (
    <>
      {step === 1 ? (
        <>
          <DialogHeader>
            <DialogTitle>Update Customer</DialogTitle>
            <DialogDescription>
              Modify the customer details below.
            </DialogDescription>
          </DialogHeader>
          <UpdateCustomerForm
            customer={currentCustomer}
            onSubmission={handleFormSubmission}
          />
        </>
      ) : (
        <>
          {status === "success" ? (
            <SuccessNotification text="Customer details have been updated successfully." />
          ) : (
            <ErrorNotification text="Failed to update customer details. Please try again." />
          )}
        </>
      )}
    </>
  );
}
