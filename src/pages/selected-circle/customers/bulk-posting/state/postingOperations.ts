import { submitBulkInstallmentEntries } from "@/api/bulkInstallmentApi";
import { BulkInstallmentPostingQuery } from "@/models/API";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GraphQLResult } from "aws-amplify/api";

interface BulkPostingResponse {
  isAllDataProcessed: boolean;
  processedCount: number;
  failedCount: number;
  totalItems: number;
  successRate: string;
}

export type postingRequestState = {
  status: "idle" | "loading" | "success" | "failed";
  error?: string;
  response?: BulkPostingResponse;
};

const initialState: postingRequestState = {
  status: "idle",
  error: undefined,
  response: undefined,
};

const postingSlice = createSlice({
  name: "posting",
  initialState,
  reducers: {
    // reset state
    resetPostingRequestState: (state) => {
      state.status = "idle";
      state.error = undefined;
      state.response = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(executeBulkPosting.pending, (state) => {
        state.status = "loading";
        state.response = undefined;
      })
      .addCase(executeBulkPosting.fulfilled, (state, action) => {
        state.status = "success";
        state.response = action.payload;
      })
      .addCase(executeBulkPosting.rejected, (state, action) => {
        state.status = "failed";
        state.response = undefined;
        if (action.payload) {
          state.error = action.payload;
        }
      });
  },
});

export const { resetPostingRequestState } = postingSlice.actions;
export default postingSlice.reducer;

type postingRequestData = {
  adminId: string;
  circleId: string;
  circleDateofCreation: string;
  agentId: string;
  agentName: string;
  agentPhoneNumber: string;
  currentDateTime: string;
  installmentType: string;
  bulkLoanDetails: string;
};

export const executeBulkPosting = createAsyncThunk<
  BulkPostingResponse,
  postingRequestData,
  { rejectValue: string }
>(
  "posting/bulkPostingInstallments",
  async (
    {
      adminId,
      circleId,
      circleDateofCreation,
      agentId,
      agentName,
      agentPhoneNumber,
      currentDateTime,
      installmentType,
      bulkLoanDetails,
    },
    { rejectWithValue }
  ) => {
    try {
      const response: GraphQLResult<BulkInstallmentPostingQuery> =
        await submitBulkInstallmentEntries({
          adminId,
          circleId,
          circleDateofCreation,
          agentId,
          agentName,
          agentPhoneNumber,
          currentDateTime,
          installmentType,
          bulkLoanDetails,
        });
      if (response.errors) {
        console.error(JSON.stringify(response.errors));
        return rejectWithValue(JSON.stringify(response.errors));
      }

      // Parse and return the response data
      if (response.data?.bulkInstallmentPosting) {
        return JSON.parse(response.data.bulkInstallmentPosting);
      }
      return rejectWithValue("No response data received");
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);
