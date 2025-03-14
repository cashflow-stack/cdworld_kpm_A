import { getInstallments } from "@/api/installmentsApi";
import { Installment } from "@/models/API";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type InstallmentState = {
  installments: Installment[];
  status: "idle" | "loading" | "failed" | "success" | "empty";
  error?: string;
};

const initialState: InstallmentState = {
  installments: [],
  status: "idle",
  error: undefined,
};

const installmentSlice = createSlice({
  name: "installments",
  initialState,
  reducers: {
    // remove the old installments and add the updated one
    updateInstallmentData(state, action: PayloadAction<Installment>) {
      state.installments = state.installments.filter(
        (installment) => installment.id !== action.payload.id
      );
      state.installments.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInstallments.pending, (state) => {
        state.status = "loading";
        state.error = undefined;
      })
      .addCase(
        fetchInstallments.fulfilled,
        (state, action: PayloadAction<Installment[]>) => {
          state.status = action.payload.length ? "success" : "empty";
          state.installments = action.payload;
          state.error = undefined;
        }
      )
      .addCase(fetchInstallments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload
          ? String(action.payload)
          : "An unknown error occurred";
      });
  },
});

export default installmentSlice.reducer;

export const { updateInstallmentData } = installmentSlice.actions;

interface LoanDetails {
  loanID: string;
  adminID: string;
}

//! Fetch installments
export const fetchInstallments = createAsyncThunk<
  Installment[],
  LoanDetails,
  { rejectValue: string }
>(
  "installments/fetchInstallments",
  async ({ loanID, adminID }, { rejectWithValue }) => {
    try {
      const response = await getInstallments({ loanID, loanAdminID: adminID });
      return response.sort((a, b) => a.installmentNumber - b.installmentNumber);
    } catch (e: any) {
      console.error(`***${e}***`);
      return rejectWithValue(e);
    }
  }
);
