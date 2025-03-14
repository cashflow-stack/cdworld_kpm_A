import { useCallback, useMemo, memo } from "react";
import LogoImageSrc from "@/assets/cashflowLogo.png";
import { PrinterIcon, CheckCheckIcon, FileCheck2, FileX2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BalanceCard } from "./components/BalanceCard";
import {
  TransactionRow,
  TransactionsTotalsRow,
  TableHeader,
} from "../../../../components/transaction-row/TransactionRow";
import { createDailySheet, getDailySheetData } from "../utils/dailySheetUtils";
import { CurrencyFormatter } from "@/toolkit/helper/helperFunctions";
import { RootState } from "@/toolkit/store";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ReloadIcon } from "@radix-ui/react-icons";
import { resetCashAccountOperation } from "../state/closing/closingOperations";
import { Spotlight } from "@/components/animated/spotlight";

interface ClosingSummaryProps {
  onClose: () => void;
}

const ClosingSummaryDialog = memo(({ onClose }: ClosingSummaryProps) => {
  const { status, error: errorMsg } = useSelector(
    (state: RootState) => state.closingOperations,
    shallowEqual
  );
  const dispatch = useDispatch();

  const handelOnClose = useCallback(() => {
    dispatch(resetCashAccountOperation());
    onClose();
  }, []);

  const dailySheetData = useMemo(() => getDailySheetData(), []);

  const memoizedTransactions = useMemo(
    () =>
      dailySheetData.transactions
        .filter(
          (transaction) => transaction.left !== 0 || transaction.right !== 0
        )
        .map((transaction, index) => (
          <TransactionRow
            key={transaction.type}
            type={transaction.type}
            left={transaction.left}
            isLeftIncomeType={transaction.isLeftIncomeType}
            right={transaction.right}
            isRigthIncomeType={transaction.isRigthIncomeType}
            isAlternate={index % 2 !== 1}
          />
        )),
    [dailySheetData]
  );

  const handleCreateDailySheet = useCallback(() => {
    createDailySheet();
  }, []);

  const isNegativeClosingBalance = useMemo(
    () => dailySheetData.closingBF < 0,
    [dailySheetData.closingBF]
  );

  const totalsRow = useMemo(
    () => (
      <TransactionsTotalsRow
        leftTotals={dailySheetData.totals.left}
        rightTotals={dailySheetData.totals.right}
      />
    ),
    [dailySheetData.totals]
  );

  if (status === "created") {
    return (
      <div className="fixed inset-0 backdrop-blur-sm bg-primary-foreground/90 bg-opacity-50 flex items-center justify-center z-50">
        <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg transform transition-all animate-in slide-in-from-bottom-4 max-w-md mx-4">
          <div className="relative">
            <div className="absolute -inset-1 bg-green-500/30 rounded-full blur-lg animate-pulse" />
            <FileCheck2
              size={48}
              className="text-green-500 dark:text-green-400 relative animate-bounce"
            />
          </div>
          <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
            Closing Entry Saved!
          </h2>
          <div className="mt-4 space-y-2 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              The daily closing entry has been successfully saved and processed.
            </p>
            <p className="text-green-600 dark:text-green-400 font-semibold">
              All transactions have been recorded
            </p>
          </div>
          <Button
            className="mt-8 bg-green-500 hover:bg-green-600 text-white dark:bg-green-600 dark:hover:bg-green-700 transition-colors"
            onClick={handelOnClose}
          >
            Close Window
          </Button>
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="fixed inset-0 backdrop-blur-sm bg-primary-foreground/90 bg-opacity-50 flex items-center justify-center z-50">
        <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg transform transition-all animate-in slide-in-from-bottom-4 max-w-md mx-4">
          <div className="relative">
            <div className="absolute -inset-1 bg-red-500/30 rounded-full blur-lg animate-pulse" />
            <FileX2
              size={48}
              className="text-red-500 dark:text-red-400 relative animate-bounce"
            />
          </div>
          <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
            Closing Failed
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300 text-center">
            Failed to save the closing entry. Please try again.
          </p>
          <div className="mt-4 p-4 bg-red-100 dark:bg-red-900/30 rounded-lg">
            <p className="text-sm text-red-600 dark:text-red-300">
              Error: {errorMsg || "Unknown error occurred"}
            </p>
          </div>
          <Button
            className="mt-8 bg-red-500 hover:bg-red-600 text-white dark:bg-red-600 dark:hover:bg-red-700 transition-colors"
            onClick={handelOnClose}
          >
            Close Window
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/60 bg-opacity-50 flex items-center justify-center py-4 z-50">
      <div className=" relative aspect-auto cursor-pointer bg-primary-foreground shadow-lg rounded-xl p-1 max-w-5xl mx-auto bg-gradient-to-b print:bg-white print:dark:bg-white print:shadow-none">
        <Spotlight
          className="from-violet-600 via-violet-500 to-fuchsia-400 blur-3xl dark:from-slate-200 dark:via-slate-100 dark:to-slate-50"
          size={150}
        />
        <div className="bg-card p-4 rounded-lg w-full relative overflow-auto h-[calc(100vh-10px)]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg">
                <img src={LogoImageSrc} alt="Cashflow" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 print:text-black print:dark:text-gray-900">
                  {dailySheetData.title}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 print:text-gray-600 print:dark:text-gray-500">
                  {dailySheetData.date}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => window.print()}
              className="print:hidden"
            >
              <PrinterIcon className="h-4 w-4" />
              <span className="sr-only">Print Daily Sheet</span>
            </Button>
          </div>
          <div>
            <div className="grid sm:grid-cols-2 gap-4 my-2 print:hidden">
              <BalanceCard
                title="Opening B/F"
                amount={dailySheetData.openingBF || 0}
                type="opening"
              />
              <BalanceCard
                title="Opening Total Outstanding"
                amount={dailySheetData.openingTotalOutstanding || 0}
                type="closing"
              />
            </div>

            <div className="overflow-x-auto bg-card rounded-lg shadow-lg print:shadow-none p-2">
              <table className="w-full min-w-[640px]">
                <thead>
                  <TableHeader />
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 dark:border-gray-700 print:border-gray-300 print:dark:border-gray-300">
                    <td className="p-3 font-semibold text-right text-gray-800 dark:text-gray-200 print:text-gray-800 print:dark:text-gray-800">
                      {CurrencyFormatter({
                        amount: dailySheetData.openingBF || 0,
                        className: "font-lato text-lg",
                      })}
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="p-3 text-right font-semibold text-gray-800 dark:text-gray-200 print:text-gray-800 print:dark:text-gray-800">
                      {CurrencyFormatter({
                        amount: dailySheetData.openingTotalOutstanding || 0,
                        className: "font-lato text-lg",
                      })}
                    </td>
                  </tr>
                  {memoizedTransactions}
                  {totalsRow}
                  <tr className="border-t-4 border-gray-300 dark:border-gray-700 print:border-gray-300 print:dark:border-gray-300">
                    <td className="p-2 font-semibold text-right text-gray-800 dark:text-gray-200 print:text-gray-800 print:dark:text-gray-800">
                      {CurrencyFormatter({
                        amount: dailySheetData.closingBF,
                        className: "font-lato text-lg",
                      })}
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="p-2 text-right font-semibold print:text-gray-800 print:dark:text-gray-800">
                      {CurrencyFormatter({
                        amount: dailySheetData.closingTotalOutstanding,
                        className: "font-lato text-lg",
                      })}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mt-4 print:hidden">
              <BalanceCard
                title="Closing B/F"
                amount={dailySheetData.closingBF}
                type="opening"
              />
              <BalanceCard
                title="Closing Total Outstanding"
                amount={dailySheetData.closingTotalOutstanding}
                type="closing"
              />
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-4 justify-end print:hidden ">
            <div className="text-base font-lato text-muted-foreground/80 text-wrap">
              Note: The final entry of the day cannot be edited after saving.
              Please double-check your statement before saving. 📝
            </div>
            <div className="flex flex-wrap justify-between sm:flex-nowrap gap-4">
              <Button onClick={handelOnClose} variant="secondary">
                Close
              </Button>

              {isNegativeClosingBalance ? (
                <div className="text-amber-500 dark:text-amber-600 font-semibold">
                  🔥 Closing balance is negative. Please check your entries
                </div>
              ) : status === "creating" ? (
                <Button disabled>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Please wait ...
                </Button>
              ) : (
                <Button
                  onClick={handleCreateDailySheet}
                  variant={"default"}
                  disabled={dailySheetData.allZero}
                  className={`text-white bg-emerald-600 hover:bg-emerald-700 transition-colors ${
                    dailySheetData.allZero ? "btn-disabled" : "btn-primary"
                  }`}
                >
                  <CheckCheckIcon size={20} className="mr-2" /> Save Closing
                  Entry
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

ClosingSummaryDialog.displayName = "ClosingSummaryDialog";
export default ClosingSummaryDialog;
