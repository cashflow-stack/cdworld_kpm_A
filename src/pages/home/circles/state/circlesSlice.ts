import { getCircles, getCirclesByMember } from "@/api/circleApi";
import { Circle } from "@/models/API";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { addAllCirclesData } from "@/toolkit/helper/helperSlice";

export type CirclesState = {
  circles: Circle[];
  status: "idle" | "loading" | "failed" | "success" | "empty";
  error?: string;
};

const initialState: CirclesState = {
  circles: [],
  status: "idle",
  error: undefined,
};

const circlesSlice = createSlice({
  name: "circles",
  initialState,
  reducers: {
    addNewCircle: (state, action: PayloadAction<Circle>) => {
      state.circles.push(action.payload);
      // update local storage
      localStorage.setItem("circles", JSON.stringify(state.circles));
    },
    updateCircleData: (state, action: PayloadAction<Circle>) => {
      console.log("Updating circle data:", action.payload);
      // update the circle data in the state
      const updatedCircle = action.payload;
      const index = state.circles.findIndex(
        (circle) => circle.id === updatedCircle.id
      );
      if (index !== -1) {
        state.circles[index] = updatedCircle;
      }
      // update local storage
      localStorage.setItem("circles", JSON.stringify(state.circles));
      // update the circle data in local storage
      const circlesFromStorage = localStorage.getItem("circles");
      if (circlesFromStorage) {
        const circles: Circle[] = JSON.parse(circlesFromStorage);
        const updatedCircles = circles.map((circle) =>
          circle.id === updatedCircle.id ? updatedCircle : circle
        );
        localStorage.setItem("circles", JSON.stringify(updatedCircles));
      }
    },
    deleteCircle: (state, action: PayloadAction<string>) => {
      state.circles = state.circles.filter(
        (circle) => circle.id !== action.payload
      );
      // update local storage
      localStorage.setItem("circles", JSON.stringify(state.circles));
    },
    resetCircles: (state) => {
      state.circles = [];
      state.status = "idle";
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCircles.pending, (state) => {
        state.status = "loading";
        state.error = undefined;
      })
      .addCase(
        fetchCircles.fulfilled,
        (state, action: PayloadAction<Circle[]>) => {
          state.status = action.payload.length ? "success" : "empty";
          state.circles = action.payload;
          state.error = undefined;
        }
      )
      .addCase(fetchCircles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload
          ? String(action.payload)
          : "An unknown error occurred";
      });
  },
});

//! Fetch circles
export const fetchCircles = createAsyncThunk<
  Circle[],
  { adminId: string; adminEmailId: string; member: boolean },
  { rejectValue: string }
>(
  "circles/fetchCircles",
  async ({ adminId, adminEmailId, member }, { rejectWithValue, dispatch }) => {
    try {
      if (member) {
        const response = await getCirclesByMember({
          memberID: adminId,
          memberName: adminEmailId,
        });
        dispatch(addAllCirclesData(response)); // Save circles to local storage
        return response;
      } else {
        const response = await getCircles({ adminId, adminEmailId });
        dispatch(addAllCirclesData(response)); // Save circles to local storage
        return response;
      }
    } catch (e: any) {
      const errorMessage = e.response.data.message;
      return rejectWithValue(errorMessage);
    }
  }
);

export default circlesSlice.reducer;

export const { addNewCircle, resetCircles, updateCircleData } =
  circlesSlice.actions;
