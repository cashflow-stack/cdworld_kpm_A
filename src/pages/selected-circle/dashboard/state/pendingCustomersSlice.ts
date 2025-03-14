import { getPendingCustomers } from "@/api/loansApi";
import { PendingCustomer } from "@/models/customModels/customModels";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type PendingCustomersState = {
  pendingCustomers: PendingCustomer[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: PendingCustomersState = {
  pendingCustomers: [],
  status: "idle",
  error: null,
};

type FetchPendingCustomersProps = {
  circleID: string;
};

export const fetchPendingCustomersAsync = createAsyncThunk<
  PendingCustomer[],
  FetchPendingCustomersProps,
  { rejectValue: string }
>(
  "customers/fetchPendingCustomers",
  async ({ circleID }, { rejectWithValue }) => {
    try {
      const response = await getPendingCustomers({ circleID });
      return response;
    } catch (error) {
      return rejectWithValue("Failed to fetch pending customers");
    }
  }
);

const pendingCustomersSlice = createSlice({
  name: "pendingCustomers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPendingCustomersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchPendingCustomersAsync.fulfilled,
        (state, action: PayloadAction<PendingCustomer[]>) => {
          state.status = "succeeded";
          state.pendingCustomers = action.payload;
        }
      )
      .addCase(fetchPendingCustomersAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch pending customers";
      });
  },
});

export default pendingCustomersSlice.reducer;
