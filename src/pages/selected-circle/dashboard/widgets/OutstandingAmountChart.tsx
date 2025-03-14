import { useTranslation } from "react-i18next";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/toolkit/store";
import {
  CurrencyFormatter,
  formatDate,
  formatDateTimeToISOString,
  formatDateToDDMMYY,
  getTimeFromISODateTime,
} from "@/toolkit/helper/helperFunctions";
import { Button } from "@/components/ui/button";
import { MdRefresh } from "react-icons/md";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchOutstandingAmount } from "../state/outstandingAmountSlice";
import { useMemo, useCallback } from "react";

const chartConfig = {
  outstanding: {
    label: "Amount",
    color: "hsl(var(--chart-1))",
  },
  label: {
    label: "Date",
    color: "hsl(var(--color-label))",
  },
} satisfies ChartConfig;

export function OutStandingAmountChart() {
  const { t } = useTranslation();
  const { status, lastFiveOutStandingEntries } = useSelector(
    (state: RootState) => state.chartsData
  );

  const chartData = useMemo(
    () => lastFiveOutStandingEntries,
    [lastFiveOutStandingEntries]
  );

  if (status === "failed") {
    return (
      <Card>
        <CardHeader>
          <OutStandingAmount />
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-40">
            {t("dashboard.failedToFetchData")}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="px-4 pt-4 pb-0">
        <OutStandingAmount />
      </CardHeader>

      <CardContent className="px-4 pt-2 pb-3">
        {status === "empty" ? (
          <div className="flex items-center justify-center h-40">
            {t("dashboard.noOutstandingAmounts")}
          </div>
        ) : status === "loading" ? (
          <div className="animate-bounce w-1/2 h-8 bg-secondary/10 rounded-full">
            <Skeleton className="h-8 w-[250px]" />
            <span className="sr-only">{t("dashboard.loading")}</span>
          </div>
        ) : (
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={chartData}
              layout="vertical"
              margin={{
                left: 16,
              }}
            >
              <CartesianGrid horizontal={false} />
              <XAxis dataKey="outstanding" type="number" hide />
              <YAxis
                dataKey="date"
                type="category"
                tickLine={false}
                tickMargin={0}
                axisLine={false}
                className="font-semibold"
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    className="text-lg"
                    labelFormatter={(value: string) => (
                      <div className="pb-2 text-base">{formatDate(value)}</div>
                    )}
                    indicator="line"
                  />
                }
              />
              <Bar dataKey="outstanding" radius={5}>
                <LabelList
                  position="insideRight"
                  dataKey="outstanding"
                  offset={10}
                  fill="white"
                  formatter={(value: any) =>
                    `${value.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                      minimumFractionDigits: 0,
                    })}`
                  }
                  className="text-sm font-semibold font-lato text-gray-950"
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}

function OutStandingAmount() {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const { status, outstandingAmount, percentChange } = useSelector(
    (state: RootState) => state.outstandingAmount
  );
  const { selectedCircle } = useSelector(
    (state: RootState) => state.dataHelper
  );

  const handelRefersh = useCallback(() => {
    dispatch(fetchOutstandingAmount({ circleID: selectedCircle?.id! }));
  }, [dispatch, selectedCircle]);

  return (
    <Card className="bg-brand text-gray-800 shadow-inner">
      <CardHeader className="flex flex-row rounded-lg items-start">
        <div className="grid">
          <CardTitle className="font-bold text-lg">
            {t("dashboard.outstandingAmount")}
          </CardTitle>
          <CardDescription className="text-gray-600 text-sm">
            {t("dashboard.lastUpdated")}
            {status === "success" && (
              <>
                {formatDateToDDMMYY(new Date().toISOString())}{" "}
                {getTimeFromISODateTime(formatDateTimeToISOString(new Date()))}
              </>
            )}
          </CardDescription>
        </div>
        <div className="ml-auto">
          <Button
            onClick={handelRefersh}
            size="icon"
            className="h-10 w-10 bg-white/80 text-gray-600 hover:bg-white hover:text-gray-800 hover:shadow-xl hover:scale-100 transition-all duration-300 ease-in-out"
          >
            <MdRefresh
              className={`${status == "loading" && "animate-spin"}`}
              size={24}
            />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex items-center justify-between font-bold">
        <>
          {status === "success" ? (
            CurrencyFormatter({
              amount: outstandingAmount,
              className: "text-3xl sm:text-4xl font-lato",
            })
          ) : (
            <div className="animate-bounce w-[200px] h-10 bg-secondary/10 rounded-full">
              <Skeleton className="h-10 bg-primary/70 w-[200px]" />
              <span className="sr-only">{t("dashboard.loading")}</span>
            </div>
          )}
        </>
        {status === "success" ? (
          <Badge className="text-xs font-semibold px-2 py-1 rounded-full bg-slate-50 text-slate-800 hover:bg-slate-100 hover:text-slate-900">
            {percentChange}%
          </Badge>
        ) : (
          <div className="animate-bounce h-10 w-[100px] bg-secondary/10 rounded-full">
            <Skeleton className="h-10 bg-primary/70  w-[100px]" />
            <span className="sr-only">{t("dashboard.loading")}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
