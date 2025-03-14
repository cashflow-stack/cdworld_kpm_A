import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import AddCaptial from "./AddCaptial";
import { Transaction, TransactionType } from "@/models/API";
import OtherTransactions from "./OtherTransactions";
import AddMemberExpensesForm from "./AddMemberExpenses";
import AddInvestment from "./AddInvestment";
import AddVehicleExpenses from "./AddVehicleExpenses";
import AmountWithdrawal from "./AmountWithdrawal";
import { useMemo } from "react";
import CashAdjustments from "./CashAdjustment";

// creating a dialog for updating Transactions

export function UpdateTransaction({
  transaction,
}: {
  transaction: Transaction;
}) {
  const transactionForm = useMemo(() => {
    switch (transaction.transactionType) {
      case TransactionType.DAYCAPTIAL:
        return <AddCaptial transaction={transaction} />;
      case TransactionType.CHITS:
      case TransactionType.INCOME:
      case TransactionType.EXPENSE:
      case TransactionType.OTHEREXPENSE:
      case TransactionType.OTHERINCOME:
        return <OtherTransactions transaction={transaction} />;
      case TransactionType.MEMBEREXPENSE:
        return <AddMemberExpensesForm transaction={transaction} />;
      case TransactionType.PARTNERINVESTMENT:
        return <AddInvestment transaction={transaction} />;
      case TransactionType.VEHICLEEXPENSE:
        return <AddVehicleExpenses transaction={transaction} />;
      case TransactionType.WITHDRAWAL:
        return <AmountWithdrawal transaction={transaction} />;
      case TransactionType.EXCESSCOLLECTION:
      case TransactionType.DEFICIT:
        return <CashAdjustments transaction={transaction} />;
      default:
        return null;
    }
  }, [transaction]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <Pencil size={22} />
        </Button>
      </DialogTrigger>
      <DialogContent>{transactionForm}</DialogContent>
    </Dialog>
  );
}
