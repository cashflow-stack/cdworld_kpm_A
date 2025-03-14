import { useMemo } from "react";
import { getDailySheetData } from "../utils/dailysheetSummaryUtils";
import { TableHeader, TransactionRow, TransactionsTotalsRow } from "@/components/transaction-row/TransactionRow";
import { CurrencyFormatter } from "@/toolkit/helper/helperFunctions";

interface SummaryData {
  openingBF: number;
  openingTotalOutstanding: number;
  closingBF: number;
  closingTotalOutstanding: number;
  transactions: Array<{
    type: string;
    left: number;
    right: number;
    isLeftIncomeType: boolean;
    isRigthIncomeType: boolean;
  }>;
  totals: {
    left: number;
    right: number;
  };
}

export default function CashAccountReport() {
  const summaryData = useMemo<SummaryData>(() => getDailySheetData(), []);

  const memoizedTransactions = useMemo(
    () =>
      summaryData.transactions
        .filter((transaction) => transaction.left !== 0 || transaction.right !== 0)
        .map((transaction, index) => (
          <TransactionRow
            key={`${transaction.type}-${index}`}
            type={transaction.type}
            left={transaction.left}
            isLeftIncomeType={transaction.isLeftIncomeType}
            right={transaction.right}
            isRigthIncomeType={transaction.isRigthIncomeType}
            isAlternate={index % 2 !== 1}
          />
        )),
    [summaryData.transactions]
  );

  const renderBalanceSection = (label: string, amount: number, outstandingAmount: number) => (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
      <div>
        <p className="text-sm text-muted-foreground/90">{label} B/F</p>
        <p className="text-2xl font-bold">
          {CurrencyFormatter({
            amount: amount,
            className: "font-lato",
          })}
        </p>
      </div>
      <div className="text-left sm:text-right">
        <p className="text-sm text-muted-foreground/90">
          {label} Outstanding
        </p>
        <p className="text-2xl font-bold">
          {CurrencyFormatter({
            amount: outstandingAmount,
            className: "font-lato",
          })}
        </p>
      </div>
    </div>
  );

  return (
    <div className="max-w-[1200px] mx-auto p-6 border border-muted-foreground/10 rounded-lg">
      {/* Opening Balance */}
      {renderBalanceSection('Opening', summaryData.openingBF, summaryData.openingTotalOutstanding)}

      {/* Table */}
      <div className="overflow-x-auto bg-card rounded-lg shadow-lg print:shadow-none p-2 mt-5">
        <table className="w-full min-w-[640px]" role="table">
          <thead>
            <TableHeader />
          </thead>
          <tbody>
            <tr className="border-b border-gray-200 dark:border-gray-700 print:border-gray-300 print:dark:border-gray-400">
              <td className="p-3 font-semibold text-right text-gray-800 dark:text-gray-200 print:text-gray-800">
                {CurrencyFormatter({
                  amount: summaryData.openingBF || 0,
                  className: "font-lato text-lg",
                })}
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td className="p-3 text-right font-semibold text-gray-800 dark:text-gray-200 print:text-gray-800">
                {CurrencyFormatter({
                  amount: summaryData.openingTotalOutstanding || 0,
                  className: "font-lato text-lg",
                })}
              </td>
            </tr>
            {memoizedTransactions}
            {useMemo(
              () => (
                <TransactionsTotalsRow
                  leftTotals={summaryData.totals.left}
                  rightTotals={summaryData.totals.right}
                />
              ),
              [summaryData.totals]
            )}
            <tr className="border-t-4 border-gray-300 dark:border-gray-700 print:border-gray-300 print:dark:border-gray-400">
              <td className="p-2 font-semibold text-right text-gray-800 dark:text-gray-200 print:text-gray-800">
                {CurrencyFormatter({
                  amount: summaryData.closingBF,
                  className:
                    "font-lato text-lg text-gray-800 dark:text-gray-200 print:text-gray-800",
                })}
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td className="p-2 text-right font-semibold text-gray-800 dark:text-gray-200 print:text-gray-800">
                {CurrencyFormatter({
                  amount: summaryData.closingTotalOutstanding,
                  className:
                    "font-lato text-lg text-gray-800 dark:text-gray-200 print:text-gray-800",
                })}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-5"></div>
      {/* Closing Balance */}
      {renderBalanceSection('Closing', summaryData.closingBF, summaryData.closingTotalOutstanding)}
    </div>
  );
}
