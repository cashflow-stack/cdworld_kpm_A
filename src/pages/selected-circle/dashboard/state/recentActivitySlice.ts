import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Transaction } from "@/models/API";
import { getTransactionsByDate } from "@/api/transactionsApi";
import { RootState } from "@/toolkit/store";

export type RecentActivityState = {
  transactions: Transaction[];
  status: "idle" | "failed" | "success" | "loading" | "empty";
  error: string | null;
};

const initialState: RecentActivityState = {
  transactions: [],
  status: "idle",
  error: null,
};

const recentActivitySlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactionsByDate.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTransactionsByDate.fulfilled, (state, action) => {
        state.status = action.payload.length === 0 ? "empty" : "success";
        state.transactions = action.payload;
      })
      .addCase(fetchTransactionsByDate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload!;
      });
  },
});

export default recentActivitySlice.reducer;

export const fetchTransactionsByDate = createAsyncThunk<
  Transaction[],
  { lastClosingDate: string },
  { rejectValue: string }
>(
  "dashboard/fetchTransactions",
  async ({ lastClosingDate }, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    const { admin, selectedCircle } = state.dataHelper;
    try {
      const transactions = await getTransactionsByDate({
        adminID: admin?.id!,
        dateTime: lastClosingDate,
        circleID: selectedCircle?.id!,
      });
      return transactions;
    } catch (error) {
      return rejectWithValue("Failed to fetch transactions");
    }
  }
);
