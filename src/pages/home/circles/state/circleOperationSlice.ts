import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Circle, UpdateCircleInput, Weekday } from "@/models/API";
import { RootState } from "@/toolkit/store";
import { addCircle, lockCircle } from "@/api/circleApi";
import { addNewCircle, updateCircleData } from "./circlesSlice";
import { adminData, onAddNewCircle } from "@/toolkit/helper/helperSlice";
import { processDate } from "@/toolkit/helper/helperFunctions";

//! Create a new circle
export type CircleOperationState = {
  status:
    | "idle"
    | "failed"
    | "creating"
    | "created"
    | "updating"
    | "updated"
    | "deleting"
    | "deleted";
  circle: Circle | null;
  error?: string;
};

const initialState: CircleOperationState = {
  status: "idle",
  circle: null,
};

const circleOperationSlice = createSlice({
  name: "circleOperations",
  initialState,
  reducers: {
    resetCircleOperation: (state) => {
      state.status = "idle";
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCircle.pending, (state) => {
        state.status = "creating";
        state.error = undefined;
      })
      .addCase(
        createCircle.fulfilled,
        (state, action: PayloadAction<Circle>) => {
          state.status = "created";
          state.circle = action.payload;
          state.error = undefined;
        }
      )
      .addCase(createCircle.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload
          ? String(action.payload)
          : "An unknown error occurred";
      })
      .addCase(circleLockOperation.pending, (state) => {
        state.status = "updating";
        state.error = undefined;
      })
      .addCase(
        circleLockOperation.fulfilled,
        (state, action: PayloadAction<Circle>) => {
          state.status = "updated";
          state.circle = action.payload;
          state.error = undefined;
        }
      )
      .addCase(circleLockOperation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload
          ? String(action.payload)
          : "An unknown error occurred";
      });
  },
});

export default circleOperationSlice.reducer;
export const { resetCircleOperation } = circleOperationSlice.actions;

//! Create a new circle
export type CreateCircleInput = {
  circleName: string;
  dateOfCreation: string;
  day: Weekday;
};

export const createCircle = createAsyncThunk<
  Circle,
  CreateCircleInput,
  { rejectValue: string }
>(
  "circleOperations/createCircle",
  async (
    { circleName, dateOfCreation, day },
    { getState, rejectWithValue, dispatch }
  ) => {
    const state = getState() as RootState;
    const admin = adminData(state);
    if (!admin) {
      return rejectWithValue("Admin not found");
    }
    const { id, emailId } = admin;
    const lastClosingEntryDate = substractDays(dateOfCreation, 1);
    try {
      const response = await addCircle({
        adminID: id,
        adminEmailId: emailId,
        circleName,
        dateOfCreation,
        lastClosingEntryDate,
        day,
      });
      // ! Dispatch the new circle to the circlesSlice
      dispatch(addNewCircle(response));
      dispatch(onAddNewCircle(response)); // add to local storage via helperSlice
      return response;
    } catch (e: any) {
      const errorMessage = e.response.data.message;
      return rejectWithValue(errorMessage);
    }
  }
);

interface LockCircleInput {
  circle: Circle;
  lock: boolean;
}

export const circleLockOperation = createAsyncThunk<
  Circle,
  LockCircleInput,
  { rejectValue: string }
>(
  "circleOperations/lockCircle",
  async ({ circle, lock }, { rejectWithValue, dispatch }) => {
    const updatedCircle: UpdateCircleInput = {
      id: circle.id,
      dateOfCreation: circle.dateOfCreation,
      isLocked: lock,
    };
    try {
      console.log("Locking/unlocking circle...");
      await lockCircle({ updatedCircle: updatedCircle });
      console.log("Circle locked/unlocked successfully");
      const circleData: Circle = {
        ...circle,
        isLocked: lock,
        __typename: "Circle",
      };
      dispatch(updateCircleData(circleData));
      return circleData;
    } catch (e: any) {
      const errorMessage = e.response.data.message;
      return rejectWithValue(errorMessage);
    }
  }
);

function substractDays(date: string, days: number): string {
  /**
   * example date: 2023-10-01
   * example days: 1
   * This function takes a date string in the format YYYY-MM-DD and subtracts the given number of days from it.
   * It returns the new date string is YYYY-MM-DDTHH:mm:ss.sssZ format.
   * result: 2023-09-30T00:00:00.000Z
   */
  const result = new Date(date);
  result.setDate(result.getDate() - days);
  return processDate({ operation: "end", date: result });
}
