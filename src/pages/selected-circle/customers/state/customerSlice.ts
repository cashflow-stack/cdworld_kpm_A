import getSimplifiedCustomers, {
  getCompleteFinanceBookData,
} from "@/api/customerApi";
import { InstallmentType, Loan } from "@/models/API";
import {
  FinanceBook,
  SimplifiedCustomer,
} from "@/models/customModels/customModels";
import {
  formatDateToYYYYMMDD,
  processDate,
} from "@/toolkit/helper/helperFunctions";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CustomerState = {
  customers: SimplifiedCustomer[];
  loans: Loan[];
  status:
    | "idle"
    | "loading"
    | "failed"
    | "success"
    | "empty"
    | "daily"
    | "weekly"
    | "monthly";
  error?: string;
  monthlyRecords: FinanceBook[];
  weeklyRecords: FinanceBook[];
  dailyRecords: FinanceBook[];
};

const initialState: CustomerState = {
  customers: [],
  loans: [],
  status: "idle",
  error: undefined,
  monthlyRecords: [],
  weeklyRecords: [],
  dailyRecords: [],
};

const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    addCustomer: (state, action: PayloadAction<SimplifiedCustomer>) => {
      console.log("Adding customer", action.payload);
      state.customers.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.status = "loading";
        state.error = undefined;
      })
      .addCase(
        fetchCustomers.fulfilled,
        (state, action: PayloadAction<SimplifiedCustomer[]>) => {
          state.status = action.payload.length ? "success" : "empty";
          state.customers = action.payload;
          state.error = undefined;
        }
      )
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload
          ? String(action.payload)
          : "An unknown error occurred";
      })
      .addCase(getFinancialItems.pending, (state) => {
        state.status = "loading";
        state.error = undefined;
      })
      .addCase(
        getFinancialItems.fulfilled,
        (
          state,
          action: PayloadAction<
            [
              {
                daily: FinanceBook[];
                weekly: FinanceBook[];
                monthly: FinanceBook[];
              }
            ]
          >
        ) => {
          state.status = "success";
          state.dailyRecords = action.payload[0].daily;
          state.weeklyRecords = action.payload[0].weekly;
          state.monthlyRecords = action.payload[0].monthly;
          state.error = undefined;
        }
      )
      .addCase(getFinancialItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload
          ? String(action.payload)
          : "An unknown error occurred";
      });
  },
});

export const { addCustomer } = customerSlice.actions;
export default customerSlice.reducer;

interface CircleDetails {
  circleID: string;
  circleDateOfCreation: string;
  cityID?: String;
}

//! Fetch customers
export const fetchCustomers = createAsyncThunk<
  SimplifiedCustomer[],
  CircleDetails,
  { rejectValue: string }
>(
  "customers/fetchCustomers",
  async ({ circleID, circleDateOfCreation, cityID }, { rejectWithValue }) => {
    try {
      const response = await getSimplifiedCustomers({
        circleID,
        circleDateOfCreation,
        cityID: cityID,
        today: formatDateToYYYYMMDD(new Date()),
      });
      return response;
    } catch (e: any) {
      console.error(`***${JSON.stringify(e)}***`);
      return rejectWithValue(e);
    }
  }
);

export const getFinancialItems = createAsyncThunk<
  [{ daily: FinanceBook[]; weekly: FinanceBook[]; monthly: FinanceBook[] }],
  CircleDetails,
  { rejectValue: string }
>(
  "customers/fetchFinancialItems",
  async ({ circleID, circleDateOfCreation }, { rejectWithValue }) => {
    const dailyResponse: FinanceBook[] = [];
    const weeklyResponse: FinanceBook[] = [];
    const monthlyResponse: FinanceBook[] = [];
    const currentDate = new Date();
    // Calculate 3 months back
    const threeMonthsBack = new Date();
    threeMonthsBack.setMonth(currentDate.getMonth() - 4);

    // Calculate 1 year back
    const oneYearBack = new Date();
    oneYearBack.setFullYear(currentDate.getFullYear() - 1);

    // Calculate 2 years back
    const twoYearsBack = new Date();
    twoYearsBack.setFullYear(currentDate.getFullYear() - 2);
    const dailyPaidDate = processDate({
      operation: "start",
      date: threeMonthsBack,
    });
    const weeklyPaidDate = processDate({
      operation: "start",
      date: oneYearBack,
    });
    const monthlyPaidDate = processDate({
      operation: "start",
      date: twoYearsBack,
    });
    const items = [
      { paidDate: dailyPaidDate, installmentType: InstallmentType.DAILY },
      { paidDate: weeklyPaidDate, installmentType: InstallmentType.WEEKLY },
      { paidDate: monthlyPaidDate, installmentType: InstallmentType.MONTHLY },
    ];
    try {
      // Use Promise.all to wait for all async operations to complete
      await Promise.all(
        items.map(async (item) => {
          const response = await getCompleteFinanceBookData({
            circleID,
            circleDateOfCreation,
            today: formatDateToYYYYMMDD(new Date()),
            paidDate: item.paidDate,
            installmentType: item.installmentType,
          });
          if (item.installmentType === InstallmentType.DAILY) {
            dailyResponse.push(...response);
          } else if (item.installmentType === InstallmentType.WEEKLY) {
            weeklyResponse.push(...response);
          } else if (item.installmentType === InstallmentType.MONTHLY) {
            monthlyResponse.push(...response);
          }
        })
      );

      return [
        {
          daily: dailyResponse,
          weekly: weeklyResponse,
          monthly: monthlyResponse,
        },
      ];
    } catch (e: any) {
      console.error(`***${JSON.stringify(e)}***`);
      return rejectWithValue(e);
    }
  }
);
