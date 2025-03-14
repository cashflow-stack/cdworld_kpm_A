import { getNewLoansAndInstallments } from "@/api/pdfGenApi";
import {
  InstallmentPrintModel,
  LoanPrintModel,
} from "@/models/customModels/customModels";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

type GeneratePdfState = {
  status: "idle" | "loading" | "success" | "failed"| "empty";
  error: string | null;
  newInstallments: InstallmentPrintModel[] | null;
  newLoans: LoanPrintModel[] | null;
};

const initialState: GeneratePdfState = {
  status: "idle",
  error: null,
  newInstallments: null,
  newLoans: null,
};

type fetchPrintModelProps = {
  circleID: string;
  fromDate: string;
  toDate: string;
};

const generatePdfSlice = createSlice({
  name: "generatePdf",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrintModels.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchPrintModels.fulfilled,
        (
          state,
          action: PayloadAction<{
            newInstallments: InstallmentPrintModel[];
            newLoans: LoanPrintModel[];
          }>
        ) => {
          // Check if payload is different to prevent unnecessary updates
          if (
            state.newInstallments !== action.payload.newInstallments ||
            state.newLoans !== action.payload.newLoans
          ) {
            if (action.payload.newInstallments.length === 0 && action.payload.newLoans.length === 0) {
              state.status = "empty";
            } else {
              state.status = "success";
              state.newInstallments = action.payload.newInstallments;
              state.newLoans = action.payload.newLoans;
            }
          }
        }
      )
      .addCase(fetchPrintModels.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      });
  },
});

export default generatePdfSlice.reducer;

export const fetchPrintModels = createAsyncThunk<
  { newInstallments: InstallmentPrintModel[]; newLoans: LoanPrintModel[] },
  fetchPrintModelProps,
  { rejectValue: string }
>(
  "generatePdf/generatePdf",
  async ({ circleID, fromDate, toDate }: fetchPrintModelProps) => {
    const response = await getNewLoansAndInstallments({
      circleID,
      fromDate,
      toDate,
    });
    return response;
  }
);
