import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { useSelector } from "react-redux";
import { RootState } from "@/toolkit/store";
import { formatDate } from "@/toolkit/helper/helperFunctions";

export default function CollectionComparisonChart() {
  const { t } = useTranslation();
  return (
    <Card>
      <Tabs defaultValue="month">
        <CardHeader className="pb-1">
          {/* CardHeader is a component that contains the title and description of the card for comparison graph of collections and loans given. */}
          <div className="flex flex-wrap items-center gap-2 justify-between">
            <div>
              <CardTitle className="">
                {t("dashboard.comparisonCollectionsLoans")}
              </CardTitle>
              <CardDescription>{t("dashboard.viewComparison")}</CardDescription>
            </div>
            <div>
              <TabsList>
                <TabsTrigger value="month">
                  {t("dashboard.oneMonth")}
                </TabsTrigger>
                <TabsTrigger value="six-months">
                  {t("dashboard.sixMonths")}
                </TabsTrigger>
                <TabsTrigger value="year">{t("dashboard.oneYear")}</TabsTrigger>
              </TabsList>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pl-1">
          <TabsContent value="month">
            <MonthlyComparisonChart />
          </TabsContent>
          <TabsContent value="six-months">
            <SixMonthsComparisonChart />
          </TabsContent>
          <TabsContent value="year">
            <YearlyComparisonChart />
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
}
const chartConfig = {
  loansGiven: {
    label: "New Loans ",
    color: "hsl(var(--chart-1))",
  },
  repayments: {
    label: "Collection ",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

function MonthlyComparisonChart() {
  const { t } = useTranslation();
  const { status, collectionEntries } = useSelector(
    (state: RootState) => state.chartsData
  );
  if (status === "failed") {
    return (
      <Card>
        <CardHeader>
          <h1>{t("dashboard.failedToGetData")}</h1>
        </CardHeader>
      </Card>
    );
  } else if (status === "success") {
    return (
      <ChartContainer config={chartConfig}>
        <LineChart
          accessibilityLayer
          data={collectionEntries}
          className="w-full h-96"
          margin={{
            top: 5,
            // right: 10,
            left: 5,
            // bottom: 5,
          }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            padding={{ left: 5, right: 5 }}
            axisLine={false}
            tickMargin={10}
            tickFormatter={(value: string) => {
              const date = new Date(value.split("T")[0]);
              return date.toLocaleDateString("en-IN", {
                month: "short",
                day: "numeric",
              });
            }}
          />
          <ChartTooltip
            cursor={true}
            content={
              <ChartTooltipContent
                className="text-lg"
                indicator="line"
                labelFormatter={(value: string) => (
                  <div className="pb-2 text-base">{formatDate(value)}</div>
                )}
              />
            }
          />
          <YAxis
            axisLine={false}
            tickMargin={10}
            tickFormatter={(value: number) =>
              new Intl.NumberFormat("en-IN").format(value)
            }
          />
          <Line
            dataKey="repayments"
            type="natural"
            stroke="var(--color-repayments)"
            strokeWidth={3}
            activeDot={{ r: 8 }}
          />
          <Line
            dataKey="loansGiven"
            type="natural"
            stroke="var(--color-loansGiven)"
            strokeWidth={3}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ChartContainer>
    );
  } else if (status === "empty") {
    return (
      <Card>
        <CardHeader>
          <h1>{t("dashboard.noDataAvailable")}</h1>
        </CardHeader>
      </Card>
    );
  }
  return (
    <Card>
      <CardHeader>
        <h1>{t("dashboard.loading")}</h1>
      </CardHeader>
    </Card>
  );
}

function SixMonthsComparisonChart() {
  return (
    <div>
      <h1>Six Months Comparison Chart</h1>
    </div>
  );
}

function YearlyComparisonChart() {
  return (
    <div>
      <h1>Yearly Comparison Chart</h1>
    </div>
  );
}
