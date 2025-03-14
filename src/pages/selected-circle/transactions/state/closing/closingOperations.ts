import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CashAccount, VerifyClosingTransactionMutationVariables } from "@/models/API";
import { createClosingCashAccountEntry } from "@/api/transactionFormsApi/closingEntryApi";
import {
  fetchTransactions,
  resetAllTransactions,
} from "../transaction/transactionSlice";

//! Create a new Cash Account
export type CashAccountOperationState = {
  status:
    | "idle"
    | "failed"
    | "creating"
    | "created"
    | "updating"
    | "updated"
    | "deleting"
    | "deleted";
  cashAccount: CashAccount | null;
  error?: string;
};

const initialState: CashAccountOperationState = {
  status: "idle",
  cashAccount: null,
};

const cashAccountOperationSlice = createSlice({
  name: "cashAccountOperations",
  initialState,
  reducers: {
    resetCashAccountOperation: (state) => {
      state.status = "idle";
      state.cashAccount = null;
      state.error = undefined;
    },
    addLastClosingEntry: (state, action: PayloadAction<CashAccount>) => {
      state.cashAccount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createClosingEntry.pending, (state) => {
        state.status = "creating";
        state.error = undefined;
      })
      .addCase(createClosingEntry.fulfilled, (state) => {
        state.status = "created";
        state.error = undefined;
      })
      .addCase(createClosingEntry.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload
          ? String(action.payload)
          : "An unknown error occurred";
      });
  },
});

export const { resetCashAccountOperation, addLastClosingEntry } =
  cashAccountOperationSlice.actions;

export default cashAccountOperationSlice.reducer;

export const createClosingEntry = createAsyncThunk<
  void,
  VerifyClosingTransactionMutationVariables,
  { rejectValue: string }
>(
  "cashAccount/createCashAccount",
  async ({ ...c }, { rejectWithValue, dispatch }) => {
    try {
      await createClosingCashAccountEntry({
        adminId: c.adminId,
        adminEmailId: c.adminEmailId,
        circleId: c.circleId,
        cashflowIn: c.cashflowIn,
        cashflowOut: c.cashflowOut,
        openingBalance: c.openingBalance,
        openingEntryDate: c.openingEntryDate,
        closingBalance: c.closingBalance,
        closingEntryDate: c.closingEntryDate,
        description: c.description || "",
        outstandingAmount: c.outstandingAmount,
        writeOff: c.writeOff ?? undefined,
        businessLoss: c.businessLoss ?? undefined,
        existingLoanOutstanding: c.existingLoanOutstanding ?? undefined,
        interest: c.interest ?? undefined,
        loansGiven: c.loansGiven,
        repayments: c.repayments,
      });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      dispatch(resetAllTransactions());
      await new Promise((resolve) => setTimeout(resolve, 1000));
      dispatch(
        fetchTransactions({
          selectedCircleID: c.circleId,
        })
      );
    } catch (error) {
      console.error(
        "Failed to create closing cash account entry:",
        JSON.stringify(error, null, 2)
      );
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);
