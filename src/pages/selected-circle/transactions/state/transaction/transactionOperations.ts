import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  AdditionalTransactionInfoInput,
  CreateTransactionInput,
  IncomeOrExpenseType,
  PaymentMethod,
  Transaction,
  TransactionEventType,
  TransactionType,
  UpdateIncomeAndExpenseInput,
  UpdateTransactionInput,
} from "@/models/API";
import {
  createNewCaptialTransaction,
  updateCaptialTransaction,
} from "@/api/transactionFormsApi/captialTransactionApi";
import {
  formatDateTimeToISOString,
  formatDateToYYYYMMDD,
} from "@/toolkit/helper/helperFunctions";
import { RootState } from "@/toolkit/store";
import {
  addTransaction,
  recalculateTotal,
} from "./transactionSlice";
import {
  removeTransaction,
  transactionOperationsApi,
  updateTransaction,
} from "@/api/transactionFormsApi/transactionOperationsApi";

//Day Captial
export type TransactionState = {
  dayCaptialTransaction: Transaction | null;
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

const initialState: TransactionState = {
  dayCaptialTransaction: null,
  status: "idle",
  error: undefined,
};

export const dayCaptialSlice = createSlice({
  name: "dayCaptial",
  initialState,
  reducers: {
    resetTransactionState: (state) => {
      state.status = "idle";
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    //* Add Day Captial
    builder
      .addCase(createNewDayCaptialEntry.pending, (state) => {
        state.status = "creating";
        state.error = undefined;
      })
      .addCase(createNewDayCaptialEntry.fulfilled, (state, action) => {
        state.status = "created";
        state.dayCaptialTransaction = action.payload;
        state.error = undefined;
      })
      .addCase(createNewDayCaptialEntry.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload
          ? String(action.payload)
          : "An unknown error occurred";
      });
    //* Update Day Captial
    builder
      .addCase(updateDayCaptialEntry.pending, (state) => {
        state.status = "updating";
        state.error = undefined;
      })
      .addCase(updateDayCaptialEntry.fulfilled, (state, action) => {
        state.status = "updated";
        state.dayCaptialTransaction = action.payload;
        state.error = undefined;
      })
      .addCase(updateDayCaptialEntry.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload
          ? String(action.payload)
          : "An unknown error occurred";
      });
    //* Create Transaction
    builder
      .addCase(createNewtransactionEntry.pending, (state) => {
        state.status = "creating";
        state.error = undefined;
      })
      .addCase(createNewtransactionEntry.fulfilled, (state, action) => {
        state.status = "created";
        state.dayCaptialTransaction = action.payload;
        state.error = undefined;
      })
      .addCase(createNewtransactionEntry.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload
          ? String(action.payload)
          : "An unknown error occurred";
      });
    //* Update Transaction
    builder
      .addCase(updateTransactionEntry.pending, (state) => {
        state.status = "updating";
        state.error = undefined;
      })
      .addCase(updateTransactionEntry.fulfilled, (state, action) => {
        state.status = "updated";
        state.dayCaptialTransaction = action.payload;
        state.error = undefined;
      })
      .addCase(updateTransactionEntry.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload
          ? String(action.payload)
          : "An unknown error occurred";
      });
    //* Delete Transaction
    builder
      .addCase(deleteTransactionEntry.pending, (state) => {
        state.status = "deleting";
        state.error = undefined;
      })
      .addCase(deleteTransactionEntry.fulfilled, (state) => {
        state.status = "deleted";
        state.dayCaptialTransaction = null;
        state.error = undefined;
      })
      .addCase(deleteTransactionEntry.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload
          ? String(action.payload)
          : "An unknown error occurred";
      });
  },
});

export default dayCaptialSlice.reducer;
export const { resetTransactionState } = dayCaptialSlice.actions;

interface DayCaptialProps {
  amount: number;
  description: string;
  date: Date;
  paymentMethod: string;
}

/* created separate async thunk for day capital because it has different api call and no need to create Income and Expense type
 */
export const createNewDayCaptialEntry = createAsyncThunk<
  Transaction,
  DayCaptialProps,
  { rejectValue: string }
>(
  "dayCaptial/createNewDayCaptialEntry",
  async (
    { amount, description, date, paymentMethod },
    { getState, rejectWithValue, dispatch }
  ) => {
    const currentDateTime = formatDateTimeToISOString(date);
    const state = getState() as RootState;
    const { admin, selectedCircle } = state.dataHelper;
    const additionalInfo: AdditionalTransactionInfoInput = {
      description,
      paymentMethod: paymentMethod as PaymentMethod,
      transactionEvent: TransactionEventType.NEW_TRANSACTION,
      memberName: "Day Capital",
    };
    const newCaptialTrancation: CreateTransactionInput = {
      additionalInfo,
      adminID: admin!.id,
      amount,
      circleDateOfCreation: selectedCircle!.dateOfCreation,
      circleID: selectedCircle!.id,
      dateTime: currentDateTime,
      transactionType: TransactionType.DAYCAPTIAL,
    };
    try {
      const result = await createNewCaptialTransaction({
        newCaptialTrancation,
      });
      dispatch(addTransaction(result));
      return result;
    } catch (e: any) {
      console.error(`***${JSON.stringify(e)}***`);
      return rejectWithValue(e);
    } finally {
      dispatch(recalculateTotal());
    }
  }
);

type updateDayCaptialEntryProps = {
  adminID: string;
  id: string;
  amount: number;
  description: string;
  date: Date;
  paymentMethod: string;
  initialAmount: number;
};

export const updateDayCaptialEntry = createAsyncThunk<
  Transaction,
  updateDayCaptialEntryProps,
  { rejectValue: string }
>(
  "dayCaptial/updateDayCaptialEntry",
  async (
    { amount, description, date, paymentMethod, adminID, id, initialAmount },
    { rejectWithValue, dispatch }
  ) => {
    const additionalInfo: AdditionalTransactionInfoInput = {
      description,
      paymentMethod: paymentMethod as PaymentMethod,
      transactionEvent: TransactionEventType.UPDATE_TRANSACTION,
      memberName: "Day Capital",
    };
    try {
      const updateDayCaptialEntry: UpdateTransactionInput = {
        additionalInfo,
        adminID,
        id,
        amount,
        initialAmount,
        dateTime: formatDateTimeToISOString(date),
        updatedDate: formatDateToYYYYMMDD(new Date()),
      };
      const result = await updateCaptialTransaction({
        captialTransaction: updateDayCaptialEntry,
      });
      dispatch(addTransaction(result));
      return result;
    } catch (e: any) {
      console.error(`***${JSON.stringify(e)}***`);
      return rejectWithValue(e);
    } finally {
      dispatch(recalculateTotal());
    }
  }
);

/**
 * Creates a new transaction entry.
 *
 * @param p - The transaction properties.
 * @returns A promise that resolves to the created transaction.
 * @throws {string} If an error occurs during the creation of the transaction.
 */
interface TransactionProps {
  amount: number;
  description: string;
  date: Date;
  paymentMethod: PaymentMethod;
  incomeOrExpenseType: IncomeOrExpenseType;
  transactionType: TransactionType;
  memberName?: string;
  memberID?: string;
}

export const createNewtransactionEntry = createAsyncThunk<
  Transaction,
  TransactionProps,
  { rejectValue: string }
>(
  "dayCaptial/createNewtransactionEntry",
  async ({ ...p }, { getState, rejectWithValue, dispatch }) => {
    const currentDateTime = formatDateTimeToISOString(p.date);
    const currentDate = formatDateToYYYYMMDD(p.date);
    const state = getState() as RootState;
    const { admin, selectedCircle } = state.dataHelper;
    try {
      const result = await transactionOperationsApi({
        adminID: admin!.id,
        adminName: admin!.name,
        adminphoneNumber: admin!.phoneNumber,
        adminEmailId: admin!.emailId,
        amount: p.amount,
        belongsTo: p.memberID || selectedCircle!.id,
        personName: p.memberName || selectedCircle!.circleName,
        description: p.description,
        circleDateOfCreation: selectedCircle!.dateOfCreation,
        circleID: selectedCircle!.id,
        city: selectedCircle!.circleName,
        customerName: p.memberName || selectedCircle!.circleName,
        tDateTime: currentDateTime,
        tDate: currentDate,
        incomeOrExpenseType: p.incomeOrExpenseType,
        paymentMethod: p.paymentMethod,
        transactionType: p.transactionType,
      });
      dispatch(addTransaction(result));
      return result;
    } catch (e: any) {
      console.error(`***${JSON.stringify(e)}***`);
      return rejectWithValue(e);
    } finally {
      dispatch(recalculateTotal());
    }
  }
);

/**
 * Updates a transaction entry.
 *
 * @param id - The ID of the transaction.
 * @param date - The date of the transaction.
 * @param adminID - The ID of the admin.
 * @param amount - The amount of the transaction.
 * @param description - The description of the transaction.
 * @param initialAmount - The initial amount of the transaction.
 * @param paymentMethod - The payment method of the transaction.
 * @param memberID - The ID of the member.
 * @param memberName - The name of the member.
 * @returns A Promise that resolves to the updated transaction.
 * @throws If an error occurs during the update process.
 */
type updateTransactionEntryProps = {
  id: string;
  adminID: string;
  amount: number;
  description: string;
  date: Date;
  paymentMethod: PaymentMethod;
  incomeOrExpenseType: IncomeOrExpenseType;
  transactionType: TransactionType;
  memberName?: string;
  memberID?: string;
  initialAmount: number;
};

export const updateTransactionEntry = createAsyncThunk<
  Transaction,
  updateTransactionEntryProps,
  { rejectValue: string }
>(
  "dayCaptial/updateTransactionEntry",
  async (
    {
      id,
      date,
      adminID,
      amount,
      description,
      initialAmount,
      paymentMethod,
      memberID,
      memberName,
      transactionType,
      incomeOrExpenseType,
    },
    { rejectWithValue, dispatch }
  ) => {
    const updatedDate = formatDateToYYYYMMDD(new Date());
    const additionalInfo: AdditionalTransactionInfoInput = {
      description,
      paymentMethod,
      transactionEvent: TransactionEventType.UPDATE_TRANSACTION,
      memberName,
      memberID,
    };
    const transactionInput: UpdateTransactionInput = {
      additionalInfo,
      adminID,
      id,
      amount,
      initialAmount,
      dateTime: formatDateTimeToISOString(date),
      transactionType,
      updatedDate,
    };
    const incomeAndExpenseInput: UpdateIncomeAndExpenseInput = {
      adminID,
      id,
      amount,
      belongsTo: memberID,
      date: formatDateToYYYYMMDD(date),
      description,
      name: memberName,
      incomeOrExpenseType,
      initialAmount,
      updatedDate,
    };
    try {
      const result = await updateTransaction({
        transaction: transactionInput,
        incomeAndExpense: incomeAndExpenseInput,
      });
      dispatch(addTransaction(result));
      return result;
    } catch (e: any) {
      console.error(`***${JSON.stringify(e)}***`);
      return rejectWithValue(e);
    } finally {
      dispatch(recalculateTotal());
    }
  }
);

export const deleteTransactionEntry = createAsyncThunk<
  string,
  { id: string; adminID: string },
  { rejectValue: string }
>(
  "dayCaptial/deleteTransactionEntry",
  async ({ id, adminID }, { rejectWithValue }) => {
    try {
      const result = await removeTransaction({ id, adminID });
      return result;
    } catch (e: any) {
      console.error(`***${JSON.stringify(e)}***`);
      return rejectWithValue(e);
    }
  }
);