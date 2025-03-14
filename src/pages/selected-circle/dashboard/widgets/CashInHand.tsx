import { FileSpreadsheet, Plus, Minus } from "lucide-react";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { MdDoubleArrow } from "react-icons/md";
import { useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  CurrencyFormatter,
  getFormattedDate,
  processDate,
} from "@/toolkit/helper/helperFunctions";
import { RootState } from "@/toolkit/store";
import routePaths from "@/constants/routePaths";
import { CashAccount } from "@/models/API";
import { CashInHandSkeleton } from "./CashInHandSkeleton";
import { ErrorDisplay } from "@/components/ErrorDisplay";
import { Link } from "react-router";
import { fetchClosingHistory } from "../cashAccountHistory/state/closingHistorySlice";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { subMonths } from "date-fns";

interface CashflowEntryProps {
  label: string;
  value: number | undefined | null;
  isPositive?: boolean;
}

const CashflowEntry = memo(
  ({ label, value = 0, isPositive = true }: CashflowEntryProps) => (
    <TableRow className="border-none">
      <TableCell className="flex gap-2 items-center">
        {isPositive ? (
          <Plus className="text-green-500" size={20} strokeWidth={3} />
        ) : (
          <Minus className="text-red-500" size={20} strokeWidth={3} />
        )}
        {label}
      </TableCell>

      {isPositive ? (
        <TableCell></TableCell>
      ) : (
        <TableCell className="border-r-2 text-right pr-5 border-dashed">
          {CurrencyFormatter({
            amount: value,
            className: "font-lato text-lg",
          })}
        </TableCell>
      )}

      {isPositive ? (
        <TableCell className="border-l-2 text-right border-dashed">
          {CurrencyFormatter({
            amount: value,
            className: "font-lato text-lg",
          })}
        </TableCell>
      ) : (
        <TableCell></TableCell>
      )}
    </TableRow>
  )
);

function CashInHand() {
  const today = new Date();
  const lastMonth = subMonths(today, 1);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { status, cashAccount, error } = useSelector(
    (state: RootState) => ({
      status: state.chartsData.status,
      cashAccount: state.chartsData.cashAccount,
      error: state.chartsData.error,
    }),
    (prev, next) =>
      prev.status === next.status &&
      prev.cashAccount?.[0]?.closingEntryDate ===
        next.cashAccount?.[0]?.closingEntryDate
  );

  const lastClosingEntry = useMemo(
    () => cashAccount?.[0] as CashAccount,
    [cashAccount]
  );

  const {
    openingBalance,
    totalIncome,
    totalExpense,
    latestIncomeEntries,
    latestExpenseEntries,
    lastClosingEntryDate,
  } = useMemo(() => {
    const opening = Number(lastClosingEntry?.openingBalance || 0);
    const {
      investments = 0,
      repayments = 0,
      excessCollection = 0,
      interest = 0,
      incomes = 0,
      loansGiven = 0,
      withdrawals = 0,
      expenses = 0,
      deficit = 0,
      chits = 0,
    } = lastClosingEntry?.closingSnapshot ?? {};

    return {
      openingBalance: opening,
      latestIncomeEntries: [
        { label: t("dashboard.investments"), value: Number(investments) },
        { label: t("dashboard.collection"), value: Number(repayments) },
        { label: t("dashboard.incomes"), value: Number(incomes) },
        { label: t("dashboard.interest"), value: Number(interest) },
        {
          label: t("dashboard.excessCollection"),
          value: Number(excessCollection),
        },
      ],
      totalIncome:
        investments + repayments + incomes + interest + excessCollection,
      latestExpenseEntries: [
        { label: t("dashboard.withdrawals"), value: Number(withdrawals) },
        {
          label: t("dashboard.loansGiven"),
          value: Number(loansGiven) + Number(interest),
        },
        { label: t("dashboard.expenses"), value: Number(expenses) },
        { label: t("dashboard.deficit"), value: Number(deficit) },
        { label: t("dashboard.chits"), value: Number(chits) },
      ],
      totalExpense: withdrawals + loansGiven + expenses + deficit + chits + interest,
      lastClosingEntryDate: !lastClosingEntry
        ? t("dashboard.noEntryFound")
        : getFormattedDate(`${cashAccount?.[0]?.closingEntryDate}`),
    };
  }, [lastClosingEntry, cashAccount, t]);

  if (status === "loading") {
    return <CashInHandSkeleton />;
  }

  if (error) {
    return <ErrorDisplay message={error} />;
  }

  return (
    <div className="grid">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex justify-between gap-2 items-center">
            <div className="flex gap-2 items-center">
              <FileSpreadsheet size={20} className="text-muted-foreground" />
              {t("dashboard.cashInHand")}
            </div>
            <div>
              <Link
                onClick={() => {
                  dispatch(
                    fetchClosingHistory({
                      circleID: cashAccount?.[0]?.circleID!,
                      fromDate: processDate({
                        operation: "start",
                        date: lastMonth,
                      }),
                      toDate: processDate({ operation: "end", date: today }),
                    })
                  );
                }}
                to={`../${routePaths.HISTORY}`}
                className="flex gap-1 items-center text-sm text-muted-foreground hover:text-foreground hover:underline underline-offset-2 transition-all duration-200 hover:scale-105"
              >
                {t("dashboard.viewAll")}
                <MdDoubleArrow
                  size={18}
                  className="hover:h-8 hover:w-8 transition-all"
                />
              </Link>
            </div>
          </CardTitle>
          <CardDescription className="text-balance max-w-lg leading-relaxed">
            {t("dashboard.lastClosingEntry")}
            {lastClosingEntryDate}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody className="font-lato text-lg md:text-xl">
              {/* Opening Balance Row */}
              <TableRow className="border-y border-dashed">
                <TableCell className="py-4">
                  &nbsp; &nbsp; &nbsp; &nbsp;{t("dashboard.openingBalance")}
                </TableCell>
                <TableCell></TableCell>
                <TableCell className="border-l-2 text-right border-dashed">
                  {CurrencyFormatter({
                    amount: openingBalance,
                    className: "font-lato text-xl font-bold text-blue-600",
                  })}
                </TableCell>
              </TableRow>

              {latestIncomeEntries.map(({ label, value }) => (
                <CashflowEntry
                  key={label}
                  label={label}
                  value={value}
                  isPositive={true}
                />
              ))}

              {/* Total Income Row */}
              <TableRow className="border-y border-dashed">
                <TableCell className="py-8 flex gap-2 items-center">
                  <Plus className="text-green-500" size={20} strokeWidth={3} />
                  {t("dashboard.cashflowIn")}
                </TableCell>

                <TableCell></TableCell>

                <TableCell className="border-l-2 text-right border-dashed">
                  {CurrencyFormatter({
                    amount: totalIncome,
                    className: "text-green-600 font-bold font-lato",
                  })}
                </TableCell>
              </TableRow>

              {latestExpenseEntries.map(({ label, value }) => (
                <CashflowEntry
                  key={label}
                  label={label}
                  value={value}
                  isPositive={false}
                />
              ))}

              {/* Total Expense Row */}
              <TableRow className="!border-y border-dashed">
                <TableCell className="py-8 flex gap-2 items-center">
                  <Minus className="text-red-500" size={20} strokeWidth={3} />
                  {t("dashboard.cashflowOut")}
                </TableCell>

                <TableCell className="border-r-2 text-right pr-5 border-dashed">
                  {CurrencyFormatter({
                    amount: totalExpense,
                    className: "text-red-600 font-bold font-lato",
                  })}
                </TableCell>

                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
        <div className="h-20 grid gap-2 grid-cols-2 m-5 content-center shadow-inner border bg-brand rounded-lg">
          <div className="flex items-center justify-start px-5 text-lg font-bold text-gray-900">
            {t("dashboard.closingBalance")}
          </div>
          <div className="flex flex-col items-end gap-0.5 justify-end px-5">
            {CurrencyFormatter({
              amount: cashAccount?.[0]?.closingBalance || 0,
              className:
                "text-2xl md:text-3xl font-bold font-lato text-gray-900",
            })}
            <span className="text-xs md:text-sm font-semibold text-lime-700">
              ({CurrencyFormatter({ amount: openingBalance })} +{" "}
              {CurrencyFormatter({ amount: totalIncome })} -{" "}
              {CurrencyFormatter({ amount: totalExpense })})
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default memo(CashInHand);
