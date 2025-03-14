import { deleteInstallment, modifyInstallment } from "@/api/installmentsApi";
import {
  Installment,
  Loan,
  LoanStatus,
  UpdateInstallmentInput,
  UpdateLoanInput,
} from "@/models/API";
import {
  calculateDate,
  formatDateToYYYYMMDD,
} from "@/toolkit/helper/helperFunctions";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateInstallmentData } from "./installmentSlice";
import { updateLoanData } from "./loanSlice";
import { getCustomerData } from "@/api/customerApi";
import { LambdaResponse } from "@/models/customModels/customModels";

export type InstallmentOperationState = {
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

const initialState: InstallmentOperationState = {
  status: "idle",
  error: undefined,
};

const installmentOperationSlice = createSlice({
  name: "installmentOperation",
  initialState,
  reducers: {
    resetInstallmentOperation(state) {
      state.status = "idle";
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateInstallment.pending, (state) => {
        state.status = "updating";
        state.error = undefined;
      })
      .addCase(updateInstallment.fulfilled, (state) => {
        state.status = "updated";
        state.error = undefined;
      })
      .addCase(updateInstallment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload
          ? String(action.payload)
          : "An unknown error occurred";
      })
      .addCase(removeInstallment.pending, (state) => {
        state.status = "deleting";
        state.error = undefined;
      })
      .addCase(removeInstallment.fulfilled, (state) => {
        state.status = "deleted";
        state.error = undefined;
      })
      .addCase(removeInstallment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload
          ? String(action.payload)
          : "An unknown error occurred";
      });
  },
});

export default installmentOperationSlice.reducer;

export const { resetInstallmentOperation } = installmentOperationSlice.actions;

interface UpdateInstallmentProps {
  allInstallments: Installment[];
  loan: Loan;
  installment: Installment;
  newAmount: number;
  newDate: string;
}

//! Update installment
export const updateInstallment = createAsyncThunk<
  void,
  UpdateInstallmentProps,
  { rejectValue: string }
>(
  "installments/updateInstallment",
  async (
    { installment, newAmount, newDate, allInstallments, loan },
    { rejectWithValue, dispatch }
  ) => {
    const updatedInstallment: UpdateInstallmentInput = {
      id: installment.id,
      adminID: installment.loanAdminID,
      paidAmount: newAmount,
      paidDate: newDate,
      initialAmount: installment.initialAmount || installment.paidAmount,
      updatedDate: installment.updatedDate || formatDateToYYYYMMDD(new Date()),
    };
    const newInstallment: Installment = {
      ...installment,
      paidAmount: newAmount,
      paidDate: newDate,
      initialAmount: installment.initialAmount || installment.paidAmount,
      updatedDate: installment.updatedDate || formatDateToYYYYMMDD(new Date()),
    };

    // from allInstallments, remove the installment that is being updated and add the new installment and calculate the total paid amount
    const updatedAllInstallments = allInstallments
      .filter((inst) => inst.id !== installment.id)
      .concat(newInstallment);
    const newTotalPaidAmount = updatedAllInstallments.reduce(
      (acc, inst) => acc + inst.paidAmount!,
      0
    );
    const loanStatus =
      newTotalPaidAmount >= loan.collectibleAmount
        ? LoanStatus.UNDERREVIEW
        : LoanStatus.ACTIVE;
    // update the loan with the new total paid amount
    const updatedLoan: UpdateLoanInput = {
      id: loan.id,
      adminID: loan.adminID,
      loanSerial: loan.loanSerial,
      paidAmount: newTotalPaidAmount,
      status: loanStatus,
    };

    try {
      await modifyInstallment({ updatedInstallment, updatedLoan });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      dispatch(updateInstallmentData(newInstallment));
      dispatch(
        updateLoanData({
          ...loan,
          paidAmount: newTotalPaidAmount,
          status: loanStatus,
        })
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

//! Delete installment
type RemoveInstallmentProps = {
  installment: Installment;
  installmentsLength: number;
  loan: Loan;
  password: string;
};
export const removeInstallment = createAsyncThunk<
  LambdaResponse,
  RemoveInstallmentProps,
  { rejectValue: string }
>(
  "installments/deleteInstallment",
  async (
    { installment, loan, installmentsLength, password },
    { rejectWithValue }
  ) => {
    try {
      const customer = await getCustomerData({
        customerId: loan.customerID!,
        adminId: loan.adminID,
      });
      if (!customer) {
        throw new Error("Customer not found");
      }
      const shouldUpdateCustomer =
        installment.id === customer.installmentPaymentInfo?.installmentID;
      const adminId = loan.adminID;
      const customerId = customer.id;
      const installmentId = installment.id;
      const nextdueDate = calculateDate({
        installmentType: loan.installmentType,
        date: loan.dateOfCreation,
        totalInstallments: installmentsLength,
        paidInstallments: 0,
      });
      const paidAmount = loan.paidAmount! - installment.paidAmount!;
      const paidInstallments = installmentsLength - 1;
      const status =
        paidAmount >= loan.collectibleAmount ? "UNDERREVIEW" : "ACTIVE";

      const result = await deleteInstallment({
        adminId,
        customerId,
        loanId: loan.id,
        installmentId,
        paidAmount,
        paidInstallments,
        status,
        shouldUpdateCustomer,
        nextDueDate: nextdueDate,
        password: password,
      });
      if (!result.success) {
        throw rejectWithValue(result.error || "Failed to delete installment");
      }
      return result;
    } catch (e) {
      return rejectWithValue(`Failed to delete installment: ${e}`);
    }
  }
);
