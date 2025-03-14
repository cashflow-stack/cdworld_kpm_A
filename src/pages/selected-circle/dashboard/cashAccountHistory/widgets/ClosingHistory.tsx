import { useMemo, useCallback, useEffect } from "react";
import React from "react";
import { CalendarIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CalculatedEntry } from "@/models/customModels/customModels";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { fetchClosingHistory } from "../state/closingHistorySlice";
import { subMonths } from "date-fns";
import {
  formatDateToDDMMYY,
  getFormattedDate,
  getTimeFromISODateTime,
  processDate,
} from "@/toolkit/helper/helperFunctions";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import CashAccountEntrySummary from "../cashAccountEntrySummary/CashAccountEntrySummary";

// Memoized row component to prevent unnecessary re-renders

const TableRowMemo = React.memo(
  ({
    entry,
    formatNumber,
  }: {
    entry: CalculatedEntry;
    formatNumber: (num: number) => string;
  }) => (
    <TableRow className="transition-colors font-lato font-medium hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
      <TableCell className="max-w-[80px]">
        {
          // entry.closingDate
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="link" className="underline text-blue-500">
                {formatDateToDDMMYY(entry.closingDate)}
              </Button>
            </HoverCardTrigger>
            <HoverCardContent>
              <div className="flex justify-between space-x-4">
                <div className="space-y-1">
                  <div className="text-sm flex gap-2 items-center font-semibold">
                    <CalendarIcon className="opacity-70" size={16} />
                    <div>Closing Entry Details</div>
                  </div>
                  <div className="flex items-center pt-2">
                    From:{" "}
                    {`${getFormattedDate(
                      entry.openingDate,
                      "short"
                    )} at ${getTimeFromISODateTime(entry.openingDate)}`}
                    <br />
                    To:{" "}
                    {`${getFormattedDate(
                      entry.closingDate,
                      "short"
                    )} at ${getTimeFromISODateTime(entry.closingDate)}`}
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        }
      </TableCell>
      <TableCell className="text-right bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-400 ">
        {formatNumber(entry.investment)}
      </TableCell>
      <TableCell className="text-right bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-400 ">
        {formatNumber(entry.collection)}
      </TableCell>
      <TableCell className="text-right bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-400 ">
        {formatNumber(entry.excess)}
      </TableCell>
      <TableCell className="text-right bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-400 ">
        {formatNumber(entry.interest)}
      </TableCell>
      <TableCell className="text-right bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-400 ">
        {formatNumber(entry.income)}
      </TableCell>
      <TableCell className="text-right">
        <div className="flex flex-col">
          {entry.calculation.previousBalance > 0 && (
            <span className="text-sm text-blue-600 dark:text-blue-400">
              Prev: {formatNumber(entry.calculation.previousBalance)}
            </span>
          )}
          <span className="font-medium text-green-700 dark:text-green-400">
            Total: {formatNumber(entry.calculation.positiveTotal)}
          </span>
          <span className="text-sm text-red-600 dark:text-red-400">
            Neg: {formatNumber(entry.calculation.negativeTotal)}
          </span>
          <span className="font-semibold border-t border-slate-200 dark:border-slate-700 text-indigo-600 dark:text-indigo-400">
            Bal: {formatNumber(entry.calculation.balance)}
          </span>
        </div>
      </TableCell>
      <TableCell className="text-right bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400">
        {formatNumber(entry.newLoans)}
      </TableCell>
      <TableCell className="text-right bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400">
        {formatNumber(entry.withdrawals)}
      </TableCell>
      <TableCell className="text-right bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400">
        {formatNumber(entry.expenses)}
      </TableCell>
      <TableCell className="text-right bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400">
        {formatNumber(entry.deficit)}
      </TableCell>
      <TableCell className="text-right bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400">
        {formatNumber(entry.chits)}
      </TableCell>
      <TableCell>
        <CashAccountEntrySummary entry={entry} />
      </TableCell>
    </TableRow>
  )
);

TableRowMemo.displayName = "TableRowMemo";

export default function ClosingHistory() {
  const today = new Date();
  const lastMonth = subMonths(today, 1);
  const dispatch = useAppDispatch();
  const { entries, status, error } = useAppSelector(
    (state) => state.closingHistory
  );
  const { selectedCircle } = useAppSelector((state) => state.dataHelper);

  useEffect(() => {
    if (!selectedCircle) return;
    if (status === "idle")
      dispatch(
        fetchClosingHistory({
          circleID: selectedCircle?.id,
          fromDate: processDate({
            operation: "start",
            date: lastMonth,
          }),
          toDate: processDate({ operation: "end", date: today }),
        })
      );
  }, [selectedCircle]);

  // Memoize the formatNumber function to prevent unnecessary re-creation
  const formatNumber = useCallback((num: number) => {
    if (num === 0) return "-";
    return num.toLocaleString("en-IN");
  }, []);

  // Memoize the table rows to prevent unnecessary re-renders
  const tableRows = useMemo(
    () =>
      entries.map((entry) => (
        <TableRowMemo
          key={entry.closingDate}
          entry={entry}
          formatNumber={formatNumber}
        />
      )),
    [entries, formatNumber]
  );

  if (status === "succeeded") {
    if (entries.length === 0) {
      return (
        <Card className="w-full">
          <div className="p-8 text-center space-y-2">
            <p className="text-slate-600">No closing history available yet</p>
            <p className="text-sm text-slate-500">
              Entries will appear here once created
            </p>
          </div>
        </Card>
      );
    }
    return (
      <div className="bg-card rounded-md shadow-md p-2">
        <div className="w-full overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="sticky top-0 ">
                <TableRow className="border-b">
                  <TableHead className="text-left font-semibold">
                    Date
                  </TableHead>
                  <TableHead className="text-center font-semibold" colSpan={5}>
                    Cashflow In
                  </TableHead>
                  <TableHead className="text-right font-semibold">
                    Calculation
                  </TableHead>
                  <TableHead className="text-center font-semibold" colSpan={5}>
                    Cashflow Out
                  </TableHead>
                  <TableHead className="w-[50px] text-center font-semibold">
                    More
                  </TableHead>
                </TableRow>
                <TableRow>
                  <TableHead className="text-left font-medium">
                    &nbsp;
                  </TableHead>
                  <TableHead className="text-right font-medium text-green-700 dark:text-green-400">
                    Investment
                  </TableHead>
                  <TableHead className="text-right font-medium text-green-700 dark:text-green-400">
                    Collection
                  </TableHead>
                  <TableHead className="text-right font-medium text-green-700 dark:text-green-400">
                    Excess
                  </TableHead>
                  <TableHead className="text-right font-medium text-green-700 dark:text-green-400">
                    Interest
                  </TableHead>
                  <TableHead className="text-right font-medium text-green-700 dark:text-green-400">
                    Income
                  </TableHead>
                  <TableHead className="text-right font-medium">
                    &nbsp;
                  </TableHead>
                  <TableHead className="text-right font-medium text-red-700 dark:text-red-400">
                    New Loans
                  </TableHead>
                  <TableHead className="text-right font-medium text-red-700 dark:text-red-400">
                    Withdrawals
                  </TableHead>
                  <TableHead className="text-right font-medium text-red-700 dark:text-red-400">
                    Expenses
                  </TableHead>
                  <TableHead className="text-right font-medium text-red-700 dark:text-red-400">
                    Deficit
                  </TableHead>
                  <TableHead className="text-right font-medium text-red-700 dark:text-red-400">
                    Chits
                  </TableHead>
                  <TableHead className="w-[30px] text-center">&nbsp;</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {entries.length > 0 ? (
                  tableRows
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={13}
                      className="h-24 text-center text-slate-500"
                    >
                      No entries found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <Card className="w-full">
        <div className="p-6 text-center space-y-2">
          <p className="text-red-600 font-medium">
            Unable to load closing history
          </p>
          <p className="text-sm text-slate-600">{error}</p>
          <Button
            onClick={() => {
              if (!selectedCircle) return;
              dispatch(
                fetchClosingHistory({
                  circleID: selectedCircle?.id,
                  fromDate: processDate({
                    operation: "start",
                    date: lastMonth,
                  }),
                  toDate: processDate({ operation: "end", date: today }),
                })
              );
            }}
            className="mt-4 px-4 py-2 text-sm rounded-md bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            Try Again
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <div className="flex justify-center items-center p-5 pt-14 animate-pulse">
        <div className="space-y-4 w-full mx-auto">
          <div className="h-20 bg-muted-foreground/10 rounded-sm"></div>
          <div className="h-20 bg-muted-foreground/10 rounded-sm"></div>
          <div className="h-20 bg-muted-foreground/10 rounded-sm"></div>
        </div>
      </div>
    </Card>
  );
}