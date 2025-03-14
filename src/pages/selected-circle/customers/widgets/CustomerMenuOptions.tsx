import { DialogContent, DialogOverlay } from "@/components/ui/dialog";
import customerOptions from "@/constants/customerMenuOptions";
import { memo, useMemo } from "react";
import CustomerLoanForm from "../create-existing-customer/customer-loan-form";
import NewOrExistingCustomerLoanForm from "../create-customer/NewOrExistingCustomerLoanForm";

type CustomerMenuOptionsProps = {
  selected: string;
};

const NewCustomerDialog = memo(() => (
  <DialogContent
    className="max-h-[calc(100vh)] overflow-y-auto"
    onPointerDownOutside={(e) => e.preventDefault()}
  >
    <NewOrExistingCustomerLoanForm />
  </DialogContent>
));

const ExistingCustomerDialog = memo(() => (
  <DialogContent
    className="max-w-[calc(100vw-20rem)] max-h-[calc(100vh)] overflow-y-auto"
    onPointerDownOutside={(e) => e.preventDefault()}
  >
    <CustomerLoanForm />
  </DialogContent>
));

NewCustomerDialog.displayName = 'NewCustomerDialog';
ExistingCustomerDialog.displayName = 'ExistingCustomerDialog';

export const CustomerMenuOptions = memo(({ selected }: CustomerMenuOptionsProps) => {
  const detailsDialog = useMemo(() => {
    switch (selected) {
      case customerOptions.NEWCUSTOMER:
        return <NewCustomerDialog />;
      case customerOptions.EXISTINGCUSTOMER:
        return <ExistingCustomerDialog />;
      default:
        return null;
    }
  }, [selected]);

  return (
    <>
      <DialogOverlay />
      {detailsDialog}
    </>
  );
});

CustomerMenuOptions.displayName = 'CustomerMenuOptions';
