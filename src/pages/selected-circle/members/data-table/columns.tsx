import { IncomeAndExpense } from "@/models/API";
import { ColumnDef } from "@tanstack/react-table";

export type IncomeAndExpenseType = IncomeAndExpense;

export const columns: ColumnDef<IncomeAndExpense>[] = [
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "incomeOrExpenseType",
    header: "Type",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];
