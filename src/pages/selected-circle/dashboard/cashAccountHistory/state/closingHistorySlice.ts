import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import {
  CalculatedEntry,
  SimplifiedClosingEntry,
} from "@/models/customModels/customModels";
import { calculateEntries } from "../utils/calculations";
import { getCashAccountHistoryList } from "@/api/cashAccountApi";

export type ClosingHistoryState = {
  range:[Date, Date] | null;
  entries: CalculatedEntry[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  nextToken: string | null;
};

const initialState: ClosingHistoryState = {
  range: null,
  entries: [],
  status: "idle",
  error: null,
  nextToken: null,
};

type fetchClosingHistoryProps = {
  circleID: string;
  fromDate: string;
  toDate: string;
  token?: string | null;
};

export const fetchClosingHistory = createAsyncThunk<
  { entries: SimplifiedClosingEntry[]; nextToken: string | null },
  fetchClosingHistoryProps,
  { rejectValue: string }
>(
  "closingHistory/fetchClosingHistory",
  async ({ circleID, fromDate, toDate, token }, { rejectWithValue }) => {
    try {
      // Validate date range doesn't exceed 1 year
      const startDate = new Date(fromDate);
      const endDate = new Date(toDate);

      // Check if dates are valid
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return rejectWithValue("Invalid date format");
      }

      // Calculate date difference in milliseconds and convert to days
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      // Check if difference exceeds 365 days (1 year)
      if (diffDays > 366) {
        return rejectWithValue("Date range cannot exceed 1 year");
      }
      // dispatch(setRange([startDate, endDate]));

      const { items, nextToken } = await getCashAccountHistoryList({
        circleID,
        fromDate,
        toDate,
        token,
      });
      return { entries: items, nextToken: nextToken ?? null };
    } catch (error) {
      console.error("Error fetching closing history:", error);
      return rejectWithValue((error as Error).message);
    }
  }
);

const closingHistorySlice = createSlice({
  name: "closingHistory",
  initialState,
  reducers: {
    setRange(state, action: PayloadAction<[Date, Date] | null>) { 
      state.range = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClosingHistory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchClosingHistory.fulfilled,
        (
          state,
          action: PayloadAction<{
            entries: SimplifiedClosingEntry[];
            nextToken: string | null;
          }>
        ) => {
          state.status = "succeeded";
          state.entries = calculateEntries(action.payload.entries);
          state.nextToken = action.payload.nextToken;
          state.error = null;
        }
      )
      .addCase(fetchClosingHistory.rejected, (state, action) => {
        console.log("fetchClosingHistory rejected", action.payload);
        state.status = "failed";
        state.error = action.payload ?? "An unknown error occurred";
      });
  },
});

export const { setRange } = closingHistorySlice.actions;

export default closingHistorySlice.reducer;
