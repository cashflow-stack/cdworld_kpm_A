import { CurrencyFormatter } from "@/toolkit/helper/helperFunctions";
import { ArrowDownIcon, ArrowUpIcon, Minus, Plus } from "lucide-react";
import { memo, useMemo } from "react";

const CurrencyDisplay = memo(
  ({ amount, isIncome }: { amount: number; isIncome: boolean }) => {
    if (amount === 0) return null;

    return (
      <span
        className={`inline-flex items-center ${
          isIncome
            ? "text-green-600 dark:text-green-500 print:text-green-700 print:dark:text-green-700"
            : "text-red-600 dark:text-rose-500 print:text-red-700 print:dark:text-red-700"
        }`}
      >
        {isIncome ? (
          <Plus className="w-4 h-4 mr-1" />
        ) : (
          <Minus className="w-4 h-4 mr-1" />
        )}
        {CurrencyFormatter({
          amount: Math.abs(amount),
          className: "font-lato text-lg",
        })}
      </span>
    );
  }
);

const TotalsCurrencyDisplay = memo(
  ({
    amount,
    right,
    left,
  }: {
    amount: number;
    right: boolean;
    left: boolean;
  }) => {
    const isPositive = amount > 0;

    return (
      <span
        className={`inline-flex items-center ${
          isPositive
            ? "text-green-600 dark:text-green-400 print:text-green-700 print:dark:text-green-700"
            : "text-red-600 dark:text-red-400 print:text-red-700 print:dark:text-red-700"
        }`}
      >
        {isPositive ? (
          right || left ? (
            <Plus size={18} />
          ) : (
            <ArrowUpIcon className="mr-1" size={20} />
          )
        ) : right || left ? (
          <Minus size={18} />
        ) : (
          <ArrowDownIcon className="mr-1" size={20} />
        )}
        {CurrencyFormatter({
          amount: Math.abs(amount),
          className: "font-lato text-lg",
        })}
      </span>
    );
  }
);

export const TableHeader = memo(() => (
  <tr className="border-b-4 font-lato print:bg-gray-100 print:text-black print:dark:text-black print:dark:border-gray-300">
    <th className="p-3 pl-6 text-left font-semibold text-gray-600 dark:text-gray-300 print:text-gray-800 print:dark:text-gray-800">
      Totals
    </th>
    <th className="p-3 text-right font-semibold text-gray-600 dark:text-gray-300 print:text-gray-800 print:dark:text-gray-800">
      Amount
    </th>
    <th className="p-3 text-center font-semibold text-gray-600 dark:text-gray-300 print:text-gray-800 print:dark:text-gray-800">
      Items
    </th>
    <th className="p-3 text-right font-semibold text-gray-600 dark:text-gray-300 print:text-gray-800 print:dark:text-gray-800">
      Amount
    </th>
    <th className="p-3 text-right font-semibold text-gray-600 dark:text-gray-300 print:text-gray-800 print:dark:text-gray-800">
      Totals
    </th>
  </tr>
));

interface TransactionRowProps {
  type: string;
  left: number;
  isLeftIncomeType: boolean;
  right: number;
  isRigthIncomeType: boolean;
  isAlternate?: boolean;
}

export const TransactionRow = memo(
  ({
    type,
    left,
    right,
    isLeftIncomeType,
    isRigthIncomeType,
    isAlternate = false,
  }: TransactionRowProps) => {
    const bgClass = useMemo(
      () =>
        isAlternate ? "bg-gray-50 dark:bg-primary/5 print:bg-gray-50" : "",
      [isAlternate]
    );

    return (
      <tr
        className={`${bgClass} border-b border-gray-200 dark:border-gray-700 print:border-gray-300 print:dark:text-gray-300 print:dark:border-gray-300`}
      >
        <td></td>
        <td className="p-3 text-right font-medium">
          <CurrencyDisplay amount={left} isIncome={isLeftIncomeType} />
        </td>
        <td className="p-3 text-center font-medium text-gray-700 dark:text-gray-300 print:text-gray-800 print:dark:text-gray-800">
          {type}
        </td>
        <td className="p-3 text-right font-medium">
          <CurrencyDisplay amount={right} isIncome={isRigthIncomeType} />
        </td>
        <td></td>
      </tr>
    );
  }
);

export const TransactionsTotalsRow = memo(
  ({
    leftTotals,
    rightTotals,
  }: {
    leftTotals: number;
    rightTotals: number;
  }) => {
    return (
      <tr className="border-t-2 font-semibold print:bg-gray-100 print:dark:bg-gray-100 print:dark:border-gray-300">
        <td className="p-3 text-right font-medium">
          <TotalsCurrencyDisplay amount={leftTotals} left right={false} />
        </td>
        <td className="p-3 text-right font-medium">
          <TotalsCurrencyDisplay
            amount={leftTotals}
            left={false}
            right={false}
          />
        </td>
        <td></td>
        <td className="p-3 text-right font-medium">
          <TotalsCurrencyDisplay
            amount={rightTotals}
            left={false}
            right={false}
          />
        </td>
        <td className="p-3 text-right font-medium">
          <TotalsCurrencyDisplay amount={rightTotals} left={false} right />
        </td>
      </tr>
    );
  }
);

TransactionRow.displayName = "TransactionRow";
TransactionsTotalsRow.displayName = "TransactionsTotalsRow";
CurrencyDisplay.displayName = "CurrencyDisplay";
TotalsCurrencyDisplay.displayName = "TotalsCurrencyDisplay";
TableHeader.displayName = "TableHeader";
