import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getCashAccountTransactionDetails } from "@/api/cashAccountApi";
import { SimplifiedTransaction } from "@/models/customModels/customModels";
import {
  calculateTransactionsTotal,
  parseDoubleJsonString,
} from "@/toolkit/helper/helperFunctions";
import { CashAccount } from "@/models/API";

export type CashAccountEntrySummaryState = {
  status: "idle" | "loading" | "failed" | "success" | "empty";
  date: string;
  range: [string, string];
  transactions: SimplifiedTransaction[] | null;
  outstandingAmountNow: number;
  cashAccount: CashAccount | null;
  cashflowIn: number;
  cashflowOut: number;
  assumedCapital: number;
  cashBag: number;
  capital: number;
  collectionAmount: number;
  existingLoanOutstanding: number;
  interest: number;
  newLoanPayments: number;
  membersLoan: number;
  memberExpenses: number;
  vehicleExpenses: number;
  newInvestments: number;
  withdrawals: number;
  excessPayment: number;
  excessCollection: number;
  writeOff: number;
  businessLoss: number;
  otherExpenses: number;
  otherIncomes: number;
  deficit: number;
  chits: number;
  subtractLoan: number;
  substractOutstanding: number;
  error?: string | null;
};

const initialState: CashAccountEntrySummaryState = {
  error: null,
  cashAccount: null,
  transactions: null,
  cashflowIn: 0,
  cashflowOut: 0,
  assumedCapital: 0,
  cashBag: 0,
  capital: 0,
  collectionAmount: 0,
  existingLoanOutstanding: 0,
  interest: 0,
  newLoanPayments: 0,
  membersLoan: 0,
  memberExpenses: 0,
  vehicleExpenses: 0,
  newInvestments: 0,
  withdrawals: 0,
  excessPayment: 0,
  excessCollection: 0,
  writeOff: 0,
  businessLoss: 0,
  otherExpenses: 0,
  otherIncomes: 0,
  deficit: 0,
  chits: 0,
  status: "idle",
  date: "",
  range: ["", ""],
  outstandingAmountNow: 0,
  subtractLoan: 0,
  substractOutstanding: 0,
};

export const fetchTransactionDetails = createAsyncThunk(
  "cashAccountEntrySummary/fetchTransactionDetails",
  async (cashAccountID: string) => {
    const response = await getCashAccountTransactionDetails({ cashAccountID });
    return response;
  }
);

const cashAccountEntrySummarySlice = createSlice({
  name: "cashAccountEntrySummary",
  initialState,
  reducers: {
    resetSummary: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactionDetails.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchTransactionDetails.fulfilled,
        (state, action: PayloadAction<CashAccount>) => {
          const cashAccount = action.payload;
          state.cashAccount = cashAccount;
          state.status = "success";
          state.range = [
            cashAccount.openingEntryDate,
            cashAccount.closingEntryDate,
          ];
          state.outstandingAmountNow = cashAccount.outstandingAmount;

          try {
            const cashAccount = action.payload;
            state.status = "success";
            state.range = [
              cashAccount.openingEntryDate,
              cashAccount.closingEntryDate,
            ];
            state.outstandingAmountNow = cashAccount.outstandingAmount;

            const parsedData: SimplifiedTransaction[] = parseDoubleJsonString<
              SimplifiedTransaction[]
            >(cashAccount.simplifiedTransactions);

            state.transactions = parsedData;
            const totals = calculateTransactionsTotal({
              transactions: parsedData,
            });
            Object.assign(state, totals);
          } catch (error) {
            console.error("Processing error:", error);
            state.error = `Failed to process transactions: ${
              (error as Error).message
            }`;
            state.transactions = [];
          }
        }
      )
      .addCase(fetchTransactionDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message || "Failed to fetch transaction details";
      });
  },
});

export const { resetSummary } = cashAccountEntrySummarySlice.actions;
export default cashAccountEntrySummarySlice.reducer;
