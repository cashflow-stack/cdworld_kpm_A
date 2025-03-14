import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CashAccount, Transaction } from "@/models/API";
import { getTransactions } from "@/api/transactionsApi";
import {
  calculateTransactionsTotal,
  formatDateTimeToISOString,
  formatDateToYYYYMMDD,
  isoDateTimeToDate,
  modifyISOString,
  processDate,
} from "@/toolkit/helper/helperFunctions";
import { getCashAccountEntries } from "@/api/cashAccountApi";
import { RootState } from "@/toolkit/store";
import { getOutstandingAmount } from "@/api/loansApi";

export type TransactionState = {
  status: "idle" | "loading" | "failed" | "success" | "empty";
  date: string;
  range: [string, string];
  transactions: Transaction[];
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
  error?: string;
  subtractLoan: number;
  substractOutstanding: number;
};

const initialState: TransactionState = {
  date: "",
  range: ["", ""],
  transactions: [],
  cashAccount: null,
  assumedCapital: 0,
  outstandingAmountNow: 0,
  cashBag: 0,
  capital: 0,
  cashflowIn: 0,
  cashflowOut: 0,
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
  subtractLoan: 0,
  substractOutstanding: 0,
  status: "idle",
  error: undefined,
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      const existingTransactionIndex = state.transactions.findIndex(
        (transaction) => transaction.id === action.payload.id
      );
      if (existingTransactionIndex !== -1) {
        state.transactions[existingTransactionIndex] = action.payload;
      } else {
        if (
          isoDateTimeToDate(state.date) ===
          isoDateTimeToDate(action.payload.dateTime)
        ) {
          state.transactions.push(action.payload);
        } else if (
          state.range[0] <= action.payload.dateTime &&
          state.range[1] >= action.payload.dateTime
        ) {
          state.transactions.push(action.payload);
        }
      }
    },
    resetAllTransactions: (state) => {
      Object.assign(state, initialState);
    },
    recalculateTotal: (state) => {
      const totals = calculateTransactionsTotal({
        transactions: state.transactions,
      });
      Object.assign(state, totals);
    },
    addDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },
    addRange: (state, action: PayloadAction<[string, string]>) => {
      state.range = action.payload;
    },
    addCashAccount: (state, action: PayloadAction<CashAccount[]>) => {
      state.cashAccount = action.payload[0];
    },
    addOutstandingAmountNow: (state, action: PayloadAction<number>) => {
      state.outstandingAmountNow = action.payload;
    },
    eliminateTransaction: (state, action: PayloadAction<string>) => {
      const transactionId = action.payload;
      const index = state.transactions.findIndex(
        (transaction) => transaction.id === transactionId
      );
      if (index !== -1) {
        state.transactions.splice(index, 1);
      }
      const totals = calculateTransactionsTotal({
        transactions: state.transactions,
      });
      Object.assign(state, totals);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.status = "loading";
        state.error = undefined;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = "success";
        state.transactions = action.payload;
        const totals = calculateTransactionsTotal({
          transactions: action.payload,
        });
        Object.assign(state, totals);
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload
          ? String(action.payload)
          : "An unknown error occurred";
      });
  },
});

export default transactionSlice.reducer;
export const {
  addTransaction,
  resetAllTransactions,
  recalculateTotal,
  addDate,
  addRange,
  addCashAccount,
  addOutstandingAmountNow,
  eliminateTransaction,
} = transactionSlice.actions;

type FetchTransactionProps = {
  toDate?: string | null;
  selectedCircleID: string;
};

export const fetchTransactions = createAsyncThunk<
  Transaction[],
  FetchTransactionProps,
  { rejectValue: string }
>(
  "transactions/fetchTransactions",
  async (
    { toDate, selectedCircleID },
    { rejectWithValue, dispatch, getState }
  ) => {
    try {
      const today = new Date();

      /**
       * Determines the next date in ISO string format based on provided conditions.
       * If toDate is provided and matches today's date (YYYY-MM-DD format), returns current date-time in ISO format.
       * If toDate is provided but doesn't match today, processes the toDate with "end" operation.
       * If toDate is not provided, returns current date-time in ISO format.
       * @remarks This is used for transaction date range calculations
       */
      const nextDateISOString = toDate
        ? formatDateToYYYYMMDD(today) === toDate.slice(0, 10)
          ? formatDateTimeToISOString(today)
          : processDate({ dateString: toDate, operation: "end" })
        : formatDateTimeToISOString(today);

      // Extracting state and validating selectedCircle
      const state = getState() as RootState;
      const { selectedCircle } = state.dataHelper;

      if (!selectedCircle) {
        return rejectWithValue("Selected circle is not available");
      }

      // Add date and fetch cash account entries
      dispatch(addDate(nextDateISOString));
      const lastClosingEntry = await getCashAccountEntries({
        circleID: selectedCircleID,
        lastClosingDate: modifyISOString(
          "add",
          formatDateTimeToISOString(today)
        )!,
      });

      const outstandingAmount = await getOutstandingAmount({
        circleID: selectedCircleID,
        date: formatDateTimeToISOString(new Date()),
      });

      dispatch(addOutstandingAmountNow(outstandingAmount));

      if (!lastClosingEntry || lastClosingEntry.length === 0) {
        console.error(
          "No closing entries found for circle ID:",
          selectedCircleID
        );
      }

      dispatch(addCashAccount(lastClosingEntry));

      const fromDate =
        lastClosingEntry[0]?.closingEntryDate ||
        processDate({ operation: "start" });

      dispatch(addRange([fromDate, nextDateISOString]));

      // Fetch transactions
      const response = await getTransactions({
        circleID: selectedCircle.id,
        circleDateOfCreation: selectedCircle.dateOfCreation,
        fromDate: fromDate,
        toDate: nextDateISOString,
      });

      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue("Failed to fetch transactions");
    }
  }
);
