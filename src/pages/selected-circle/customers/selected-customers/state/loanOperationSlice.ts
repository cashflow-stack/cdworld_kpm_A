import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { LambdaResponse } from "@/models/customModels/customModels";
import { Loan, LoanStatus } from "@/models/API";
import { deleteLoan } from "@/api/loansApi";
import { formatDateTimeToISOString } from "@/toolkit/helper/helperFunctions";

export type LoanOperationState = {
  status:
    | "idle"
    | "failed"
    | "creating"
    | "created"
    | "updating"
    | "updated"
    | "deleting"
    | "deleted";
  error?: string;
};

const initialState: LoanOperationState = {
  status: "idle",
  error: undefined,
};

const loanOperationSlice = createSlice({
  name: "loanOperation",
  initialState,
  reducers: {
    resetLoanOperation(state) {
      state.status = "idle";
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(executeLoanRemoval.pending, (state) => {
        state.status = "deleting";
        state.error = undefined;
      })
      .addCase(executeLoanRemoval.fulfilled, (state) => {
        state.status = "deleted";
        state.error = undefined;
      })
      .addCase(executeLoanRemoval.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload
          ? String(action.payload)
          : "An unknown error occurred";
      });
  },
});

export const { resetLoanOperation } = loanOperationSlice.actions;

export default loanOperationSlice.reducer;

type RemoveLoanProps = {
  loan: Loan;
  password: string;
  circleId: string;
  memberId: string;
  memberName: string;
};

export const executeLoanRemoval = createAsyncThunk<
  LambdaResponse,
  RemoveLoanProps,
  { rejectValue: unknown }
>(
  "loan/removeLoan",
  async ({ loan, circleId, password, memberId, memberName }, { rejectWithValue }) => {
    if (loan.status === LoanStatus.CLOSED) {
      const result = { success: false, error: "Loan is already closed and will be expaired"};
      return rejectWithValue(result);
    }
    try {
      const response = await deleteLoan({
        adminId: loan.adminID!,
        circleId,
        customerId: loan.customerID!,
        loanId: loan.id,
        loanSerial: loan.loanSerial,
        loanDeletionPassword: password,
        outstandingAmount: loan.collectibleAmount,
        dateTime: formatDateTimeToISOString(new Date()),
        paidAmount: loan.paidAmount,
        givenAmount: loan.givenAmount,
        memberId,
        memberName,
      });
      
      if (!response.success) {
        throw rejectWithValue(response.error || "Failed to delete loan");
      }
      return response;
    } catch (error) {
      return rejectWithValue(`Failed to delete loan: ${error}`);
    }
  }
);
