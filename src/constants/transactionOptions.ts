import { IncomeOrExpenseType, TransactionType } from "@/models/API";
type type = {
  label: string;
  incomeOrExpenseType: IncomeOrExpenseType;
  transactionType: TransactionType;
};

export default {
  DAYCAPTIAL: "dayCaptial",
  VEHICLEEXPENSE: "vehicleExpense",
  MEMBEREXPENSE: "memberExpenses",
  PARTNERINVESTMENT: "investments",
  TRANSFER: "transfer",
  OTHERS: "others",
  WITHDRAWAL: "withdrawal",
  CASHADJUSTMENT: "cashAdjustment",
};

export const cashAdjustment: type[] = [
  {
    label: "Excess Collection",
    incomeOrExpenseType: IncomeOrExpenseType.EXCESSCOLLECTION,
    transactionType: TransactionType.EXCESSCOLLECTION,
  },
  {
    label: "Deficit",
    incomeOrExpenseType: IncomeOrExpenseType.DEFICIT,
    transactionType: TransactionType.DEFICIT,
  },
];

export const memberExpense: type[] = [
  {
    label: "Agent Loan",
    incomeOrExpenseType: IncomeOrExpenseType.AGENTLOAN,
    transactionType: TransactionType.MEMBERLOAN,
  },
  {
    label: "Partner Loan",
    incomeOrExpenseType: IncomeOrExpenseType.PARTNERLOAN,
    transactionType: TransactionType.MEMBERLOAN,
  },
  {
    label: "Supervisor Loan",
    incomeOrExpenseType: IncomeOrExpenseType.SUPERVISORLOAN,
    transactionType: TransactionType.MEMBERLOAN,
  },
  {
    label: "Agent Personal Expense",
    incomeOrExpenseType: IncomeOrExpenseType.AGENTEXPENSE,
    transactionType: TransactionType.MEMBEREXPENSE,
  },
  {
    label: "Partner Personal Expense",
    incomeOrExpenseType: IncomeOrExpenseType.PARTNEREXPENSE,
    transactionType: TransactionType.MEMBEREXPENSE,
  },
  {
    label: "Supervisor Personal Expense",
    incomeOrExpenseType: IncomeOrExpenseType.SUPERVISOREXPENSE,
    transactionType: TransactionType.MEMBEREXPENSE,
  },
];

export const otherIncomeOrExpenses: type[] = [
  {
    label: "Agent Expense",
    incomeOrExpenseType: IncomeOrExpenseType.AGENTEXPENSE,
    transactionType: TransactionType.MEMBEREXPENSE,
  },
  {
    label: "Agent Salary",
    incomeOrExpenseType: IncomeOrExpenseType.AGENTSALARY,
    transactionType: TransactionType.MEMBEREXPENSE,
  },
  {
    label: "Partner Salary",
    incomeOrExpenseType: IncomeOrExpenseType.PARTNERSALARY,
    transactionType: TransactionType.MEMBEREXPENSE,
  },
  {
    label: "Supervisor Salary",
    incomeOrExpenseType: IncomeOrExpenseType.SUPERVISORSALARY,
    transactionType: TransactionType.MEMBEREXPENSE,
  },
  {
    label: "Other Income",
    incomeOrExpenseType: IncomeOrExpenseType.OTHERINCOME,
    transactionType: TransactionType.OTHERINCOME,
  },
  {
    label: "Interest Income",
    incomeOrExpenseType: IncomeOrExpenseType.INTERESTINCOME,
    transactionType: TransactionType.INCOME,
  },
  {
    label: "Chit Fund Payment",
    incomeOrExpenseType: IncomeOrExpenseType.CHITS,
    transactionType: TransactionType.CHITS,
  },
  {
    label: "Other Expense",
    incomeOrExpenseType: IncomeOrExpenseType.OTHEREXPENSE,
    transactionType: TransactionType.EXPENSE,
  },
  {
    label: "Stationary Expense",
    incomeOrExpenseType: IncomeOrExpenseType.STATIONARYEXPENSE,
    transactionType: TransactionType.EXPENSE,
  },
  {
    label: "Business Expense",
    incomeOrExpenseType: IncomeOrExpenseType.BUSINESSEXPENSE,
    transactionType: TransactionType.EXPENSE,
  },
  {
    label: "Traveling Expense",
    incomeOrExpenseType: IncomeOrExpenseType.TRAVELINGEXPENSE,
    transactionType: TransactionType.EXPENSE,
  },
];

export const vehicleExpenses: type[] = [
  {
    label: "Vehicle Expense",
    incomeOrExpenseType: IncomeOrExpenseType.VEHICLEEXPENSE,
    transactionType: TransactionType.EXPENSE,
  },
  {
    label: "Vehicle Petrol",
    incomeOrExpenseType: IncomeOrExpenseType.VEHICLEPETROL,
    transactionType: TransactionType.EXPENSE,
  },
];
