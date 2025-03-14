import { DialogContent, DialogOverlay } from "@/components/ui/dialog";
import AddCaptial from "./AddCaptial";
import transactionOptions from "@/constants/transactionOptions";
import OtherTransactions from "./OtherTransactions";
import AddInvestment from "./AddInvestment";
import AddMemberExpensesForm from "./AddMemberExpenses";
import AmountWithdrawal from "./AmountWithdrawal";
import AddVehicleExpenses from "./AddVehicleExpenses";
import { useMemo } from "react";
import CashAdjustments from "./CashAdjustment";

export function TransactionForm({ selected }: { selected: string }) {
  const transactionForm = useMemo(() => {
    switch (selected) {
      case transactionOptions.DAYCAPTIAL:
        return <AddCaptial />;
      case transactionOptions.OTHERS:
        return <OtherTransactions />;
      case transactionOptions.MEMBEREXPENSE:
        return <AddMemberExpensesForm />;
      case transactionOptions.PARTNERINVESTMENT:
        return <AddInvestment />;
      case transactionOptions.WITHDRAWAL:
        return <AmountWithdrawal />;
      case transactionOptions.VEHICLEEXPENSE:
        return <AddVehicleExpenses />;
      case transactionOptions.CASHADJUSTMENT:
        return <CashAdjustments />;
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
