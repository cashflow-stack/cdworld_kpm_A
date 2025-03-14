import React from "react";
import { MdFlare } from "react-icons/md";
import { Plus, Minus, BriefcaseBusiness } from "lucide-react";
import { CurrencyFormatter, getFormattedDate } from "@/toolkit/helper/helperFunctions";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface CashBagSummaryProps {
  capital: number;
  collectionAmount: number;
  newLoanPayments: number;
  assumedCapital: number;
  range: string[];
  children?: React.ReactNode;
}

const SummaryItem = React.memo(({ icon, label, value, className }: any) => (
  <li className="flex text-lg items-center justify-between">
    <span className="flex gap-2 items-center">
      {icon} <span>{label}</span>
    </span>
    <span className={className}>{value}</span>
  </li>
));

export const getSummaryItems = ({
  capital,
  collectionAmount,
  newLoanPayments,
  assumedCapital,
}: Omit<CashBagSummaryProps, "range" | "children">) => [
  {
    id: 1,
    icon: <MdFlare className="text-muted-foreground" />,
    label: "Day Capital",
    value: CurrencyFormatter({ amount: capital }),
    className: "font-bold font-lato",
  },
  {
    id: 2,
    icon: <Plus className="text-sky-600" size={20} strokeWidth={3} />,
    label: "Collection",
    value: CurrencyFormatter({
      amount: collectionAmount,
    }),
    className: "font-bold font-lato text-sky-500",
  },
  {
    id: 3,
    icon: <Minus className="text-red-500" size={20} strokeWidth={3} />,
    label: "New Loans",
    value: CurrencyFormatter({
      amount: newLoanPayments,
    }),
    className: "font-bold font-lato text-red-500",
  },
  {
    id: 4,
    icon: (
      <BriefcaseBusiness
        size={22}
        className={`${assumedCapital !== 0 ? "text-rose-600" : "text-green-500"}`}
      />
    ),
    label: assumedCapital !== 0 ? "Capital" : "Cash In Bag",
    value: assumedCapital !== 0 ? (
      <span>
        {" "}
        &minus;&nbsp;
        {CurrencyFormatter({ amount: assumedCapital })}
      </span>
    ) : (
      <span>
        {CurrencyFormatter({
          amount: capital + collectionAmount - newLoanPayments,
        })}
      </span>
    ),
    className: `font-bold font-lato sm:text-xl ${
      assumedCapital !== 0 ? "text-rose-600" : "text-green-500"
    }`,
  },
];

export const CashBagSummary = ({
  capital,
  collectionAmount,
  newLoanPayments,
  assumedCapital,
  range,
  children,
}: CashBagSummaryProps) => {
  const summaryItems = getSummaryItems({
    capital,
    collectionAmount,
    newLoanPayments,
    assumedCapital,
  });

  return (
    <Card
      className="w-full rounded-xl mx-auto overflow-hidden border border-gray-100 dark:border-zinc-700/50 backdrop-blur-sm
      bg-gradient-to-br from-white via-gray-50/80 to-gray-50 dark:from-zinc-900/90 dark:via-zinc-900/70 dark:to-zinc-800/50
      transition-all duration-300 hover:shadow-lg"
    >
      <CardHeader
        className="flex flex-row items-center rounded-t-xl px-6 py-4 
        bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm
        border-b border-gray-100 dark:border-zinc-700/50"
      >
        <div className="grid gap-1">
          <CardTitle className="sm:text-xl font-semibold">
            Cashflow Summary
          </CardTitle>
          <CardDescription>
            <span className="text-sm text-muted-foreground/80">
              {getFormattedDate(range[0], "short").split(",")[0]} &rarr;{" "}
              {getFormattedDate(range[1], "short")}
            </span>
          </CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-1">
          {children}
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid gap-2">
          {summaryItems.map((item, index) => (
            <React.Fragment key={item.id}>
              <div
                className="group rounded-lg px-4 py-2.5 transition-all duration-200
                bg-gradient-to-r from-transparent via-transparent to-transparent
                hover:from-gray-50 hover:to-gray-50/50 
                dark:hover:from-zinc-800/50 dark:hover:to-zinc-800/30
                hover:shadow-sm"
              >
                <SummaryItem
                  icon={item.icon}
                  label={item.label}
                  value={item.value}
                  className={item.className}
                />
              </div>
              {index === summaryItems.length - 2 && <Separator className="my-2" />}
            </React.Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
