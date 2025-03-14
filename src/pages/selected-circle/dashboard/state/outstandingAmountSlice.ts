import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getOutstandingAmount } from "@/api/loansApi";
import { formatDateTimeToISOString } from "@/toolkit/helper/helperFunctions";
import { getCashAccountEntries } from "@/api/cashAccountApi";
import { CashAccount } from "@/models/API";

export type OutstandingAmountState = {
  selectedCircleID?: string;
  outstandingAmount: number;
  status: "idle" | "loading" | "failed" | "success";
  error: string | null;
  lastClosingCashAccount?: CashAccount | null;
  percentChange?: number;
};

const initialState: OutstandingAmountState = {
  outstandingAmount: 0,
  status: "idle",
  error: null,
};

const outstandingAmountSlice = createSlice({
  name: "outstandingAmount",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOutstandingAmount.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchOutstandingAmount.fulfilled,
        (
          state,
          action: PayloadAction<{
            percentChange: number;
            outstandingAmount: number;
          }>
        ) => {
          state.status = "success";
          state.outstandingAmount = action.payload.outstandingAmount;
          state.percentChange = action.payload.percentChange;
          state.error = null;
        }
      )
      .addCase(fetchOutstandingAmount.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload
          ? String(action.payload)
          : "Failed to fetch outstanding amount";
      });
  },
});

export default outstandingAmountSlice.reducer;

type OutstandingAmountProps = {
  circleID: string;
  date?: string;
};

export const fetchOutstandingAmount = createAsyncThunk<
  { percentChange: number; outstandingAmount: number },
  OutstandingAmountProps,
  { rejectValue: string }
>(
  "outstandingAmount/fetchOutstandingAmount",
  async ({ circleID, date }, { rejectWithValue }) => {
    const today = formatDateTimeToISOString(new Date());
    const effectiveDate = date || today;

    try {
      const addLastClosingEntry = await getCashAccountEntries({
        circleID: circleID,
        lastClosingDate: effectiveDate,
      });

      if (!addLastClosingEntry.length) {
        throw new Error("No closing entries found");
      }

      const oldOutstandingAmount = addLastClosingEntry[0].outstandingAmount;

      const newOutstandingAmount = await getOutstandingAmount({
        circleID,
        date: effectiveDate,
      });

      const percentChange = calculatePercentChange(oldOutstandingAmount, newOutstandingAmount);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      return {
        percentChange: percentChange,
        outstandingAmount: newOutstandingAmount,
      };
    } catch (error) {
      console.error("Error fetching outstanding amount:", error);
      return rejectWithValue("Failed to fetch outstanding amount");
    }
  }
);

function calculatePercentChange(oldAmount: number, newAmount: number): number {
  let percentChange = parseFloat(
    (((newAmount - oldAmount) / oldAmount) * 100).toFixed(2)
  );

  if (!isFinite(percentChange)) {
    percentChange = 0;
  }

  return percentChange;
}
