import getSimplifiedLoanData from "@/api/bulkInstallmentApi";
import { SimplifiedLoan } from "@/models/customModels/customModels";
import { getISOTimeRange } from "@/toolkit/helper/helperFunctions";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export type postingRequestState = {
  status: "idle" | "loading" | "success" | "failed";
  loans: SimplifiedLoan[];
  error?: string;
};

const initialState: postingRequestState = {
  status: "idle",
  loans: [],
  error: undefined,
};

const postingSlice = createSlice({
  name: "posting",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSimplifiedLoans.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSimplifiedLoans.fulfilled, (state, action) => {
        state.status = "success";
        state.loans = action.payload;
      })
      .addCase(fetchSimplifiedLoans.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) {
          state.error = action.payload;
        }
      });
  },
});

export const {} = postingSlice.actions;
export default postingSlice.reducer;

interface requiredPostingData {
  circleID: string;
  selectedPostingDate: Date;
}

export const fetchSimplifiedLoans = createAsyncThunk<
  SimplifiedLoan[],
  requiredPostingData,
  { rejectValue: string }
>(
  "posting/fetchLoans",
  async ({ circleID, selectedPostingDate }, { rejectWithValue }) => {
    try {
      const { fromDateISOString, nextDateISOString } = getISOTimeRange({
        fromDate: selectedPostingDate,
      });

      const response = await getSimplifiedLoanData({
        circleID,
        dateOfCreation: nextDateISOString,
        fromDate: fromDateISOString,
        toDate: nextDateISOString,
      });
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);
