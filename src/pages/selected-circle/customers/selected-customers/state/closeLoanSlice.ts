import { closeLoan } from "@/api/loansApi";
import { loadCustomerLoanSerial } from "@/api/customerApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  expireAtDate,
  formatDateToYYYYMMDD,
  removeFirstOccurrence,
} from "@/toolkit/helper/helperFunctions";
import { Loan } from "@/models/API";
import { RootState } from "@/toolkit/store";
import { processLoanTermination } from "@/api/loansApi";

export type CloseLoanState = {
  status: "idle" | "loading" | "failed" | "success";
  error?: string;
};

const initialState: CloseLoanState = {
  status: "idle",
  error: undefined,
};

const closeLoanSlice = createSlice({
  name: "closeLoan",
  initialState,
  reducers: {
    resetCloseLoanState: (state) => {
      state.status = "idle";
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(executeLoanClosure.pending, (state) => {
        state.status = "loading";
        state.error = undefined;
      })
      .addCase(executeLoanClosure.fulfilled, (state) => {
        state.status = "success";
        state.error = undefined;
      })
      .addCase(executeLoanClosure.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload
          ? String(action.payload)
          : "An unknown error occurred";
      });
  },
});

export default closeLoanSlice.reducer;

export const { resetCloseLoanState } = closeLoanSlice.actions;

export const executeLoanClosure = createAsyncThunk<
  void,
  { loan: Loan; password?: string },
  { rejectValue: string }
>(
  "installments/createInstallment",
  async ({ loan, password }, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    const { selectedCircle, admin, member, selectedCustomer } =
      state.dataHelper;

    try {
      // selectedCustomer is a simplified version of the customer object.
      // It only contains current loan serial we are fetching all loans serials of the customer
      const customerLoanSerial = await loadCustomerLoanSerial({
        id: selectedCustomer?.id!,
        adminID: admin?.id!,
      });

      if (loan.paidAmount >= loan.collectibleAmount) {
        await closeLoan({
          adminId: admin?.id!,
          closingLoanSerial: loan.loanSerial,
          closingReason: `This loan has been reviewed and closed by ${
            member?.name || admin?.name
          }`,
          customerId: selectedCustomer?.id!,
          endDate: formatDateToYYYYMMDD(new Date()),
          expireAt: expireAtDate(),
          loanId: loan.id,
          totalCollectedAmount: loan.paidAmount,
          updatedSerialNumbers: removeFirstOccurrence(
            customerLoanSerial,
            loan.loanSerial
          ),
        });
        return;
      }
      if (!password) throw new Error("Password is required to close the loan");
      let result = await processLoanTermination({
        loan,
        circleDateofCreation: selectedCircle?.dateOfCreation!,
        closingReason: `This loan was forcibly closed by ${
          member?.name || admin?.name
        }`,
        customerName: selectedCustomer?.customerName!,
        expireAt: expireAtDate(),
        updatedSerialNumbers: removeFirstOccurrence(
          customerLoanSerial,
          loan.loanSerial
        ),
        password: password,
        agentId: member?.id || admin?.id!,
        agentName: member?.name || admin?.name!,
        agentPhoneNumber: member?.phoneNumber || admin?.phoneNumber!,
      });
      console.log("Loan closed successfully", JSON.stringify(result));
    } catch (error) {
      console.error(`***${error}***`);
      return rejectWithValue(String(error));
    }
  }
);
