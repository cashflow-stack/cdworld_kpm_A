import { getFormattedDate } from "@/toolkit/helper/helperFunctions";
import { store } from "@/toolkit/store";
import { RootState } from "@/toolkit/store";
import { Admin, CashAccount, Circle } from "@/models/API";

// Define interfaces for type safety
interface TransactionData {
  outstandingAmountNow: number;
  admin: Admin;
  selectedCircle: Circle | null;
  cashAccount: CashAccount | null;
  range: string[];
  collectionAmount: number;
  existingLoanOutstanding: number;
  interest: number;
  newLoanPayments: number;
  membersLoan: number;
  memberExpenses: number;
  vehicleExpenses: number;
  newInvestments: number;
  withdrawals: number;
  otherIncomes: number;
  otherExpenses: number;
  excessPayment: number;
  writeOff: number;
  businessLoss: number;
  cashBag: number;
  cashflowIn: number;
  cashflowOut: number;
  capital: number;
  assumedCapital: number;
  excessCollection: number;
  chits: number;
  deficit: number;
  subtractLoan: number;
  substractOutstanding: number;
}

export const getTransactionData = (): TransactionData => {
  const state = store.getState() as RootState;
  const { selectedCircle, admin } = state.dataHelper;

  if (!selectedCircle || !admin) {
    throw new Error("Selected circle or admin data is missing");
  }

  const transactions = state.cashAccountEntrySummary;

  // Validate required fields
  if (!transactions.range || transactions.range.length !== 2) {
    throw new Error("Invalid date range");
  }

  const {
    outstandingAmountNow,
    cashAccount,
    range,
    collectionAmount,
    existingLoanOutstanding,
    interest,
    newLoanPayments,
    membersLoan,
    memberExpenses,
    vehicleExpenses,
    newInvestments,
    withdrawals,
    otherIncomes,
    otherExpenses,
    excessPayment,
    writeOff,
    businessLoss,
    cashBag,
    cashflowIn,
    cashflowOut,
    capital,
    assumedCapital,
    excessCollection,
    chits,
    deficit,
    subtractLoan,
    substractOutstanding,
  } = transactions; // from transactionSlice
  return {
    outstandingAmountNow,
    admin,
    selectedCircle,
    cashAccount,
    range,
    collectionAmount,
    existingLoanOutstanding,
    interest,
    newLoanPayments,
    membersLoan,
    memberExpenses,
    vehicleExpenses,
    newInvestments,
    withdrawals,
    otherIncomes,
    otherExpenses,
    excessPayment,
    writeOff,
    businessLoss,
    cashBag,
    cashflowIn,
    cashflowOut,
    capital,
    assumedCapital,
    excessCollection,
    chits,
    deficit,
    subtractLoan,
    substractOutstanding,
  };
};

export const getDailySheetData = () => {
  try {
    const data = getTransactionData();

    if (!data.cashAccount) {
      throw new Error("Cash account data is missing");
    }

    // Validate numerical inputs
    const numericFields = [
      data.collectionAmount,
      data.newLoanPayments,
      data.interest,
      data.memberExpenses,
      data.membersLoan,
      data.vehicleExpenses,
      data.newInvestments,
      data.withdrawals,
      data.otherExpenses,
      data.otherIncomes,
      data.excessPayment,
    ];

    if (numericFields.some((field) => typeof field !== "number")) {
      throw new Error("Invalid numeric fields detected");
    }

    const totalLeft =
      data.collectionAmount -
      data.newLoanPayments -
      data.membersLoan -
      data.memberExpenses -
      data.vehicleExpenses +
      data.newInvestments -
      data.withdrawals -
      data.otherExpenses +
      data.otherIncomes +
      data.excessPayment + // excessPayment is a extra cash from the customer
      data.excessCollection - // excessCollection is from Agent
      data.chits -
      data.deficit +
      data.subtractLoan;

    const totalRight =
      data.newLoanPayments +
      data.existingLoanOutstanding +
      data.interest -
      data.businessLoss -
      data.writeOff -
      data.collectionAmount +
      data.excessPayment;

    const closingTotalOutstanding =
      // data.cashAccount?.description === "Initial Entry" ?
      data.outstandingAmountNow;
    // : (data.cashAccount?.outstandingAmount || 0) + totalRight;

    const openingTotalOutstanding =
      // data.cashAccount?.description === "Initial Entry"?
      data.outstandingAmountNow -
      data.newLoanPayments -
      data.existingLoanOutstanding -
      data.interest +
      data.businessLoss +
      data.writeOff +
      data.collectionAmount;
    // : data.cashAccount?.outstandingAmount;

    const closingBF = (data.cashAccount?.openingBalance || 0) + totalLeft;

    const allZero =
      totalLeft === 0 &&
      totalRight === 0 &&
      data.cashAccount?.closingBalance === closingBF &&
      closingTotalOutstanding === openingTotalOutstanding;

    return {
      title: `Summary Sheet of ${data.selectedCircle?.circleName}`,
      date: `${getFormattedDate(data.range[0], "short")} - ${getFormattedDate(
        data.range[1],
        "short"
      )}`,
      openingBF: data.cashAccount?.openingBalance,
      openingTotalOutstanding: openingTotalOutstanding,
      closingBF,
      closingTotalOutstanding,
      transactions: [
        {
          type: "COLLECTION",
          left: data.collectionAmount,
          isLeftIncomeType: true,
          right: data.collectionAmount,
          isRigthIncomeType: false,
        },
        {
          type: "NEW LOANS",
          left: data.newLoanPayments + data.interest,
          isLeftIncomeType: false,
          right: data.newLoanPayments + data.interest,
          isRigthIncomeType: true,
        },
        {
          type: "INTEREST",
          left: data.interest,
          isLeftIncomeType: true,
          right: 0,
          isRigthIncomeType: false,
        },
        {
          type: "MEMBERS EXPENSES",
          left: data.memberExpenses,
          isLeftIncomeType: false,
          right: 0,
          isRigthIncomeType: false,
        },
        {
          type: "MEMBERS LOAN",
          left: data.membersLoan,
          isLeftIncomeType: false,
          right: 0,
          isRigthIncomeType: false,
        },
        {
          type: "VEHICLE EXPENSES",
          left: data.vehicleExpenses,
          isLeftIncomeType: false,
          right: 0,
          isRigthIncomeType: false,
        },
        {
          type: "NEW INVESTMENTS",
          left: data.newInvestments,
          isLeftIncomeType: true,
          right: 0,
          isRigthIncomeType: true,
        },
        {
          type: "WITHDRAWALS",
          left: data.withdrawals,
          isLeftIncomeType: false,
          right: 0,
          isRigthIncomeType: false,
        },
        {
          type: "OTHER EXPENSES",
          left: data.otherExpenses,
          isLeftIncomeType: false,
          right: 0,
          isRigthIncomeType: false,
        },
        {
          type: "OTHER INCOMES",
          left: data.otherIncomes,
          isLeftIncomeType: true,
          right: 0,
          isRigthIncomeType: true,
        },
        {
          type: "EXCESS PAYMENT",
          left: data.excessPayment,
          isLeftIncomeType: true,
          right: 0,
          isRigthIncomeType: true,
        },
        {
          type: "WRITEOFF's",
          left: 0,
          isLeftIncomeType: false,
          right: data.writeOff,
          isRigthIncomeType: false,
        },
        {
          type: "BUSINESSLOSS",
          left: 0,
          isLeftIncomeType: false,
          right: data.businessLoss,
          isRigthIncomeType: false,
        },
        {
          type: "OLD LOANS",
          left: 0,
          isLeftIncomeType: false,
          right: data.existingLoanOutstanding,
          isRigthIncomeType: true,
        },
        {
          type: "EXCESS COLLECTION",
          left: data.excessCollection,
          isLeftIncomeType: true,
          right: 0,
          isRigthIncomeType: false,
        },
        {
          type: "CHITS",
          left: data.chits,
          isLeftIncomeType: false,
          right: 0,
          isRigthIncomeType: false,
        },
        {
          type: "DEFICIT",
          left: data.deficit,
          isLeftIncomeType: false,
          right: 0,
          isRigthIncomeType: false,
        },
        {
          type: "DELETE LOAN",
          left: data.subtractLoan,
          isLeftIncomeType: data.subtractLoan >= 0 ? true : false,
          right: data.substractOutstanding,
          isRigthIncomeType: data.substractOutstanding >= 0 ? true : false,
        },
      ],
      totals: { left: totalLeft, right: totalRight },
      allZero,
    };
  } catch (error) {
    console.error("Error in getDailySheetData:", error);
    throw error;
  }
};
