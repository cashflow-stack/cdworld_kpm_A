import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { CashAccount } from "@/models/API";
import { getCashAccountEntries } from "@/api/cashAccountApi";
import {
  formatDate,
  formatDateTimeToISOString,
} from "@/toolkit/helper/helperFunctions";
// import { addLastClosingEntry } from "@/toolkit/helper/helperSlice";

type LineChartDataType = {
  fill: string;
  date: string;
  outstanding: number;
};
type CollectionChartDataType = {
  date: string;
  loansGiven: number;
  repayments: number;
};

export type closingState = {
  // last 5 closing entries to show last 5 Outstanding Amounts in the dashboard
  lastFiveOutStandingEntries: LineChartDataType[];
  // collection entries to show the collection chart in the dashboard
  collectionEntries: CollectionChartDataType[];
  status: "idle" | "failed" | "success" | "loading" | "empty";
  error?: string | null;
  cashAccount: CashAccount[] | null;
};

const initialState: closingState = {
  lastFiveOutStandingEntries: [],
  collectionEntries: [],
  status: "idle",
  error: null,
  cashAccount: null,
};

type fetchCashAccountProps = {
  selectedCircleID: string;
  closingDate?: string;
  limit?: number;
};

export const fetchCashAccountEntries = createAsyncThunk<
  CashAccount[],
  fetchCashAccountProps,
  { rejectValue: string }
>(
  "closing/fetchLastClosingEntry",
  async ({ selectedCircleID, closingDate, limit }, { rejectWithValue }) => {
    const today = formatDateTimeToISOString(new Date());
    try {
      const response = await getCashAccountEntries({
        circleID: selectedCircleID,
        lastClosingDate: closingDate || today,
        limit: limit || 7,
      });
      // dispatch(addLastClosingEntry(response[0]));
      return response;
    } catch (error) {
      return rejectWithValue("Failed to fetch last closing entry");
    }
  }
);

const chartsDataSlice = createSlice({
  name: "closing",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCashAccountEntries.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchCashAccountEntries.fulfilled,
        (state, action: PayloadAction<CashAccount[]>) => {
          state.status = action.payload.length === 0 ? "empty" : "success";
          state.cashAccount = action.payload;
          state.lastFiveOutStandingEntries = getLastFiveOutStandingEntries(
            action.payload
          );
          state.collectionEntries = convertCashAccountToCollectionChart(
            action.payload
          );
          state.error = null;
        }
      )
      .addCase(fetchCashAccountEntries.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload
          ? String(action.payload)
          : "Failed to fetch last closing entry";
      });
  },
});

export default chartsDataSlice.reducer;

/**
 * Retrieves the last five outstanding entries from a given array of cash accounts.
 *
 * @param cashAccount - The array of cash accounts.
 * @returns An array of objects containing the date and outstanding amount of the last five entries.
 */
export const getLastFiveOutStandingEntries = (
  cashAccountArray: CashAccount[]
) => {
  return cashAccountArray.slice(0, 5).map((entry, index) => {
    return {
      fill: `hsl(var(--chart-${index + 1}))`,
      date: formatDate(entry.closingEntryDate),
      outstanding: entry.outstandingAmount,
    };
  });
};

/**
 * Converts an array of CashAccount objects into a collection of chart data.
 * @param cashAccount - The array of CashAccount objects to be converted.
 * @returns An array of objects containing the month, loans given, and repayments for each CashAccount entry.
 */
export const convertCashAccountToCollectionChart = (
  cashAccount: CashAccount[]
) => {
  const data = cashAccount.slice(0, 6).map((entry) => {
    return {
      date: entry.closingEntryDate,
      loansGiven: entry.closingSnapshot.loansGiven,
      repayments: entry.closingSnapshot.repayments,
    };
  });
  return data.reverse();
};
