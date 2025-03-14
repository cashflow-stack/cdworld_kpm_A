import { getCashAccountEntries } from "@/api/cashAccountApi";
import { CashAccount } from "@/models/API";
import { modifyISOString, processDate } from "@/toolkit/helper/helperFunctions";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type closingState = {
  status: "idle" | "failed" | "success" | "loading" | "empty";
  error?: string | null;
  cashAccount: CashAccount | null;
};

const initialState: closingState = {
  status: "idle",
  error: null,
  cashAccount: null,
};

const closingSlice = createSlice({
  name: "closing",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLastClosingEntry.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchLastClosingEntry.fulfilled,
        (state, action: PayloadAction<CashAccount[]>) => {
          state.status = action.payload.length === 0 ? "empty" : "success";
          state.cashAccount = action.payload[0] || null;
          state.error = null;
        }
      )
      .addCase(fetchLastClosingEntry.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload
          ? String(action.payload)
          : "Failed to fetch last closing entry";
      });
  },
});

export default closingSlice.reducer;
export const {} = closingSlice.actions;

// fetchLastClosingEntryProps
export type FetchLastClosingEntryProps = {
  selectedCircleID: string;
  closingDate?: string;
  toDate?: string;
};

export const fetchLastClosingEntry = createAsyncThunk<
  CashAccount[],
  FetchLastClosingEntryProps,
  { rejectValue: string }
>(
  "closing/fetchLastClosingEntry",
  async ({ closingDate, selectedCircleID }, { rejectWithValue }) => {
    try {
      const response = await getCashAccountEntries({
        circleID: selectedCircleID,
        lastClosingDate:
          modifyISOString("add", closingDate) ||
          processDate({
            operation: "end",
          }),
      });
      return response;
    } catch (error) {
      return rejectWithValue("Failed to fetch last closing entry");
    }
  }
);
