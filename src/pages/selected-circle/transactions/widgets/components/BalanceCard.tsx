import { Card, CardContent } from "@/components/ui/card";
import { CurrencyFormatter } from "@/toolkit/helper/helperFunctions";

interface BalanceCardProps {
  title: string;
  amount: number;
  type: "opening" | "closing";
}

export const BalanceCard = ({ title, amount, type }: BalanceCardProps) => {
  const bgColor = type === "opening" ? "bg-green-50" : "bg-blue-50";
  const borderColor =
    type === "opening" ? "border-green-200" : "border-blue-200";
  const textColor = type === "opening" ? "text-emerald-700" : "text-blue-700";
  const amountColor = type === "opening" ? "text-emerald-600" : "text-blue-600";

  return (
    <Card
      className={`${bgColor} rounded-lg dark:bg-opacity-5 ${borderColor} dark:border-opacity-20 print:dark:border-opacity-100 print:bg-white print:border print:${borderColor}`}
    >
      <CardContent className="px-4 py-2 text-center">
        <p
          className={`text-sm font-medium ${textColor} dark:text-opacity-80 print:${textColor}`}
        >
          {title}
        </p>
        <p
          className={`text-3xl ${amountColor} dark:text-opacity-90 print:${amountColor}`}
        >
          {CurrencyFormatter({
            amount: amount,
            className: "font-lato font-semibold",
          })}
        </p>
      </CardContent>
    </Card>
  );
};
