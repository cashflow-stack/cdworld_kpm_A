import {
  ArrowBigDown,
  ArrowBigUp,
  ArrowDownFromLine,
  ArrowUpFromLine,
  AtSign,
  Bike,
  HandCoins,
  IndianRupee,
  Landmark,
  Trash2,
  User,
} from "lucide-react";
import {
  MdOutlineThumbDown,
  MdOutlineThumbUp,
  MdStarHalf,
} from "react-icons/md";
import { CurrencyFormatter } from "@/toolkit/helper/helperFunctions";

interface FinancialData {
  memberExpenses: number;
  vehicleExpenses: number;
  newInvestments: number;
  withdrawals: number;
  otherIncomes: number;
  otherExpenses: number;
  businessLoss: number;
  writeOff: number;
  excessPayment: number;
  existingLoanOutstanding: number;
  excessCollection: number;
  deficit: number;
  chits: number;
  subtractLoan: number;
  substractOutstanding: number;
}

export const getFinancialActivities = (data: FinancialData) => [
  {
    id: 1,
    name: "Member Expenses",
    icon: <User size={20} />,
    amount: data.memberExpenses,
    color: "text-primary",
  },
  {
    id: 2,
    name: "Vehicle Expenses",
    icon: <Bike size={20} />,
    amount: data.vehicleExpenses,
    color: "text-primary",
  },
  {
    id: 3,
    name: "Investment",
    icon: <Landmark size={20} />,
    amount: data.newInvestments,
    color: "text-primary",
  },
  {
    id: 4,
    name: "Withdrawal",
    icon: <IndianRupee size={20} />,
    amount: data.withdrawals,
    color: "text-primary",
  },
  {
    id: 5,
    name: "Other Income",
    icon: <ArrowBigUp size={20} />,
    amount: data.otherIncomes,
    color: "text-primary",
  },
  {
    id: 6,
    name: "Other Expanse",
    icon: <ArrowBigDown size={20} />,
    amount: data.otherExpenses,
    color: "text-primary",
  },
  {
    id: 7,
    name: "Business Loss",
    icon: <MdOutlineThumbDown size={20} />,
    amount: data.businessLoss,
    color: "text-primary",
  },
  {
    id: 8,
    name: "Write-Offs",
    icon: <MdStarHalf size={20} />,
    amount: data.writeOff,
    color: "text-primary",
  },
  {
    id: 9,
    name: "Excess Payment",
    icon: <MdOutlineThumbUp size={20} />,
    amount: data.excessPayment,
    color: "text-primary",
  },
  {
    id: 10,
    name: "Existing Loans",
    icon: <HandCoins size={20} />,
    amount: data.existingLoanOutstanding,
    color: "text-primary",
  },
  {
    id: 11,
    name: "Excess Collection",
    icon: <ArrowUpFromLine size={20} />,
    amount: data.excessCollection,
    color: "text-primary",
  },
  {
    id: 12,
    name: "Deficit Amount",
    icon: <ArrowDownFromLine size={20} />,
    amount: data.deficit,
    color: "text-primary",
  },
  {
    id: 13,
    name: "Chits Payment",
    icon: <AtSign size={20} />,
    amount: data.chits,
    color: "text-primary",
  },
  {
    id: 14,
    name: "Deleted Transactions",
    icon: <Trash2 size={20} />,
    amount: data.subtractLoan,
    color: "text-primary",
  },
];

export const FinancialActivities = ({ data }: { data: FinancialData }) => {
  const activities = getFinancialActivities(data);

  return (
    <div className="grid grid-cols-2 gap-4 cursor-pointer">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="relative bg-gradient-to-br from-white to-gray-50 dark:from-zinc-900/80 dark:to-zinc-800/50 
            rounded-xl p-6 
            hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]
            transition-all duration-300 ease-in-out
            border border-muted-foreground/20 dark:border-zinc-700/50
            backdrop-blur-sm"
        >
          <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-green-400 animate-pulse" />

          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-primary/10 dark:bg-primary/5">
              {activity.icon}
            </div>
            <span className="font-medium text-gray-800 dark:text-gray-200">
              {activity.name}
            </span>
          </div>

          <div className="text-primary font-bold">
            <CurrencyFormatter
              amount={activity.amount}
              className="font-lato text-2xl xl:text-3xl tracking-tight"
            />
          </div>
        </div>
      ))}
    </div>
  );
};
