import { useEffect, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import {
  CreditCard,
  Bike,
  MoveUp,
  MoveDown,
  ArrowDownUp,
  Coins,
} from "lucide-react";
import { AppDispatch, RootState } from "@/toolkit/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactionsByDate } from "./state/recentActivitySlice";
import {
  CurrencyFormatter,
  formatDateTimeToISOString,
  getFormattedDate,
  getTimeFromISODateTime,
} from "@/toolkit/helper/helperFunctions";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { fetchOutstandingAmount } from "./state/outstandingAmountSlice";
import { OutStandingAmountChart } from "./widgets/OutstandingAmountChart";
import CollectionComparisonChart from "./widgets/CollectionComparisonChart";
import { fetchCashAccountEntries } from "./state/chartsDataSlice";
import { TransactionType } from "@/models/API";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { memo } from "react"; // Added import for memo
import { PendingCustomersCard } from "./widgets/PendingCustomersCard";
import { fetchPendingCustomersAsync } from "./state/pendingCustomersSlice";
import MemoizedCashInHand from "./widgets/CashInHand";

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedCircle } = useSelector(
    (state: RootState) => state.dataHelper
  );
  const { status, cashAccount } = useSelector(
    (state: RootState) => state.chartsData
  );

  // Guard clause for missing circle
  if (!selectedCircle?.id) {
    return <div>Please select a circle first</div>;
  }

  // Memoize date to prevent unnecessary rerenders
  const today = useMemo(() => formatDateTimeToISOString(new Date()), []);

  // Combine initial data fetching
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        await Promise.all([
          dispatch(
            fetchOutstandingAmount({
              circleID: selectedCircle.id,
              date: today,
            })
          ),
          dispatch(
            fetchCashAccountEntries({
              selectedCircleID: selectedCircle.id,
              closingDate: today,
              limit: 7,
            })
          ),
          dispatch(
            fetchPendingCustomersAsync({
              circleID: selectedCircle.id,
            })
          ),
        ]);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };

    fetchInitialData();
  }, [dispatch, selectedCircle.id, today]);

  // Fetch transactions after cash account data is loaded
  useEffect(() => {
    if (status === "success" && cashAccount?.[0]?.closingEntryDate) {
      dispatch(
        fetchTransactionsByDate({
          lastClosingDate: cashAccount[0].closingEntryDate,
        })
      );
    }
  }, [dispatch, cashAccount, status]);

  if (status === "success") {
    return <MemoizedDashboardScreen />;
  } else if (status === "failed") {
    return <div>Failed to fetch dashboard data</div>;
  } else { 
    return <div>Loading dashboard data...</div>;
  }
}

const DashboardScreen = () => {
  return (
    <main className="grid flex-1 items-start gap-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid pt-4 sm:pt-0 auto-rows-max items-start gap-3 md:gap-8 lg:col-span-2">
        <CollectionComparisonChart />
        <MemoizedCashInHand />
      </div>
      <div className="grid gap-4 md:gap-8">
        {/* //! OutStanding Amount  */}
        <OutStandingAmountChart />
        {/* //! Recent Activity */}
        <MemoizedRecentActivity />
        {/* //! Pending Customers */}
        <PendingCustomersCard />
      </div>
    </main>
  );
};

const MemoizedDashboardScreen = memo(DashboardScreen); // Memoized component


function RecentActivity() {
  const { t } = useTranslation();
  const { status, transactions } = useSelector(
    (state: RootState) => state.recentActivity
  );

  const selectIcon = useCallback(({ type }: { type: TransactionType }) => {
    switch (type) {
      case "DAYCAPTIAL":
        return <Coins className="text-blue-500" size={20} strokeWidth={3} />;
      case "REPAYMENT":
        return <MoveUp className="text-green-500" size={20} strokeWidth={3} />;
      case "LOAN":
        return <MoveDown className="text-red-500" size={20} strokeWidth={3} />;
      default:
        return <CreditCard className="h-6 w-6 text-accent" />;
    }
  }, []);

  if (status === "loading") {
    return <div>{t("dashboard.loading")}</div>;
  } else if (status === "failed") {
    return <div>{t("dashboard.failedToFetchData")}</div>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row rounded-t-lg items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg tracking-normal">
            <ArrowDownUp className="h-6 w-6 text-muted-foreground" />
            {t("dashboard.recentActivity")}
          </CardTitle>
          <CardDescription>
            {t("dashboard.viewRecentTransactions")}
          </CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <Bike className="h-4 w-4" />
            <Link
              to={"../circle-Transactions"}
              className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap"
            >
              {t("dashboard.showAll")}
            </Link>
          </Button>
        </div>
      </CardHeader>
      <ScrollArea className="h-[calc(70vh)]">
        <CardContent className="text-sm">
          {transactions.length === 0 ? (
            <p className="text-center p-5 text-xl text-muted-foreground">
              {t("dashboard.noRecentTransactions")}
            </p>
          ) : (
            transactions.map((transaction) => (
              <div key={transaction.id}>
                <div className="flex py-4 items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex-shrink-0">
                      {selectIcon({ type: transaction.transactionType })}
                    </div>
                    <div>
                      <div className="font-medium">
                        {transaction.additionalInfo.transactionEvent}
                      </div>
                      <div className="text-muted-foreground">
                        {`${getFormattedDate(
                          transaction.dateTime
                        )} - ${getTimeFromISODateTime(transaction.dateTime)}`}
                      </div>
                    </div>
                  </div>
                  <div className="text-foreground">
                    {CurrencyFormatter({
                      amount: transaction.amount,
                      className: "text-lg font-lato",
                    })}
                  </div>
                </div>
                <Separator />
              </div>
            ))
          )}
        </CardContent>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </Card>
  );
}

const MemoizedRecentActivity = memo(RecentActivity); // Memoized component

export {
  MemoizedDashboardScreen as DashboardScreen,
  MemoizedCashInHand as CashInHand,
  MemoizedRecentActivity as RecentActivity,
};
