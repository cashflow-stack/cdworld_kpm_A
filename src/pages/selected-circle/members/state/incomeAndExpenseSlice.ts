import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IncomeAndExpense } from "@/models/API";
import { getIncomeAndExpenseList } from "@/api/incomeAndExpenseApi";

export type IncomeAndExpenseState = {
  incomeAndExpense: IncomeAndExpense[];
  status: "idle" | "loading" | "failed" | "success" | "empty";
  error?: string;
};

const initialState: IncomeAndExpenseState = {
  incomeAndExpense: [],
  status: "idle",
  error: undefined,
};

const incomeAndExpenseSlice = createSlice({
  name: "incomeAndExpense",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIncomeAndExpense.pending, (state) => {
        state.status = "loading";
        state.error = undefined;
      })
      .addCase(
        fetchIncomeAndExpense.fulfilled,
        (state, action: PayloadAction<IncomeAndExpense[]>) => {
          state.status = action.payload.length ? "success" : "empty";
          state.incomeAndExpense = action.payload;
          state.error = undefined;
        }
      )
      .addCase(fetchIncomeAndExpense.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload
          ? String(action.payload)
          : "An unknown error occurred";
      });
  },
});

export default incomeAndExpenseSlice.reducer;

export const fetchIncomeAndExpense = createAsyncThunk<
  IncomeAndExpense[],
  { memberId: string; date: string; circleId: string },
  { rejectValue: string }
>(
  "incomeAndExpense/fetchIncomeAndExpense",
    async ({ memberId, date, circleId }, { rejectWithValue }) => {
    try {
      const response = await getIncomeAndExpenseList({
        memberId,
        date,
        circleId,
      });

      return response;
    } catch (e: string | any) {
      return rejectWithValue(e);
    }
  }
);

/**
 * // Subscribe to creation of Todo
const createSub = client
  .graphql({ query: subscriptions.onCreateTodo })
  .subscribe({
    next: ({ data }) => console.log(data),
    error: (error) => console.warn(error)
  });

// Subscribe to update of Todo
const updateSub = client
  .graphql({ query: subscriptions.onUpdateTodo })
  .subscribe({
    next: ({ data }) => console.log(data),
    error: (error) => console.warn(error)
  });

// Subscribe to deletion of Todo
const deleteSub = client
  .graphql({ query: subscriptions.onDeleteTodo })
  .subscribe({
    next: ({ data }) => console.log(data),
    error: (error) => console.warn(error)
  });

 */