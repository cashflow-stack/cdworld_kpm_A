import { getLoans } from "@/api/loansApi";
import { Loan } from "@/models/API";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type LoanState = {
  loans: Loan[];
  status: "idle" | "loading" | "failed" | "success" | "empty";
  error?: string;
};

const initialState: LoanState = {
  loans: [],
  status: "idle",
  error: undefined,
};

const loanSlice = createSlice({
  name: "loans",
  initialState,
  reducers: {
    updateLoanData(state, action: PayloadAction<Loan>) {
      // find the updated loan and update it
      state.loans = state.loans.map((loan) =>
        loan.id === action.payload.id
          ? {
              ...loan,
              paidAmount: action.payload.paidAmount,
              status: action.payload.status,
            }
          : loan
      );
    },
    deleteLoanData(state, action: PayloadAction<string>) {
      state.loans = state.loans.filter((loan) => loan.id !== action.payload);
      state.status = state.loans.length ? "success" : "empty";
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoans.pending, (state) => {
        state.status = "loading";
        state.error = undefined;
      })
      .addCase(fetchLoans.fulfilled, (state, action: PayloadAction<Loan[]>) => {
        state.status = action.payload.length ? "success" : "empty";
        state.loans = action.payload;
        state.error = undefined;
      })
      .addCase(fetchLoans.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload
          ? String(action.payload)
          : "An unknown error occurred";
      });
  },
});

export default loanSlice.reducer;

export const { updateLoanData, deleteLoanData } = loanSlice.actions;

interface CustomerDetails {
  customerID: string;
  adminID: string;
}

//! Fetch loans
export const fetchLoans = createAsyncThunk<
  Loan[],
  CustomerDetails,
  { rejectValue: string }
>("loans/fetchLoans", async ({ customerID, adminID }, { rejectWithValue }) => {
  try {
    const response = await getLoans({ customerID, customerAdminID: adminID });
    return response;
  } catch (e: any) {
    console.error(`***${e}***`);
    return rejectWithValue(e);
  }
});
