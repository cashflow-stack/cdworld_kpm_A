import {
  addNewCity,
  deleteExistingCity,
  updateCityInfo,
} from "@/api/citiesApi";
import { City, UpdateCityInput } from "@/models/API";
import { RootState } from "../../store";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { onCityAdded, onCityDeleted, onCityUpdated } from "./citiesSlice";

export type TransactionState = {
  cities: City | null;
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
  cities: null,
  status: "idle",
  error: undefined,
};

/**
 * Creates a new city asynchronously.
 *
 * @param name - The name of the city.
 * @returns A promise that resolves to the created city.
 * @throws {string} If an error occurs during the creation process.
 */
type CityInputProps = {
  name: string;
};

export const createCity = createAsyncThunk<
  City,
  CityInputProps,
  { rejectValue: string }
>(
  "cities/addCity",
  async ({ name }, { rejectWithValue, getState, dispatch }) => {
    const state = getState() as RootState;
    const { admin, selectedCircle } = state.dataHelper;
    try {
      const response = await addNewCity({
        adminID: admin?.id!,
        circleDateOfCreation: selectedCircle?.dateOfCreation!,
        circleID: selectedCircle?.id!,
        name,
      });
      dispatch(onCityAdded(response));
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Updates a city asynchronously.
 *
 * @param p - The input properties for updating the city.
 * @param rejectWithValue - The function to reject the promise with a specific value.
 * @returns A promise that resolves to the updated city or rejects with an error message.
 */
interface CityUpdateInputProps {
  oldCity: City;
  name: string;
}

export const updateCity = createAsyncThunk<
  City,
  CityUpdateInputProps,
  { rejectValue: string }
>("cities/updateCity", async ({ ...p }, { rejectWithValue, dispatch }) => {
  const inputs: UpdateCityInput = {
    id: p.oldCity.id,
    adminID: p.oldCity.adminID,
    circleDateOfCreation: p.oldCity.circleDateOfCreation,
    circleID: p.oldCity.circleID,
    name: p.name,
  };

  try {
    const response = await updateCityInfo({
      updatedCity: inputs,
    });
    dispatch(onCityUpdated(response));
    return response;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

/**
 * Deletes a city asynchronously.
 *
 * @param city - The city to be deleted.
 * @param rejectWithValue - A function to reject the promise with a specific value.
 * @returns A promise that resolves to the deleted city or rejects with an error message.
 */
type CityDeleteInputProps = {
  city: City;
};

export const deleteCity = createAsyncThunk<
  City,
  CityDeleteInputProps,
  { rejectValue: string }
>("cities/deleteCity", async ({ city }, { rejectWithValue, dispatch }) => {
  try {
    const response = await deleteExistingCity({
      cityID: city.id,
      adminId: city.adminID,
    });
    dispatch(onCityDeleted(city));
    return response;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const cityOperationsSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    resetCityState: (state) => {
      state.status = "idle";
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCity.pending, (state) => {
        state.status = "creating";
        state.error = undefined;
      })
      .addCase(createCity.fulfilled, (state, action) => {
        state.status = "created";
        state.cities = action.payload;
        state.error = undefined;
      })
      .addCase(createCity.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload
          ? String(action.payload)
          : "An unknown error occurred";
      })
      .addCase(updateCity.pending, (state) => {
        state.status = "updating";
        state.error = undefined;
      })
      .addCase(updateCity.fulfilled, (state, action) => {
        state.status = "updated";
        state.cities = action.payload;
        state.error = undefined;
      })
      .addCase(updateCity.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload
          ? String(action.payload)
          : "An unknown error occurred";
      })
      .addCase(deleteCity.pending, (state) => {
        state.status = "deleting";
        state.error = undefined;
      })
      .addCase(deleteCity.fulfilled, (state, action) => {
        state.status = "deleted";
        state.cities = action.payload;
        state.error = undefined;
      })
      .addCase(deleteCity.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload
          ? String(action.payload)
          : "An unknown error occurred";
      });
  },
});

export const { resetCityState } = cityOperationsSlice.actions;
export default cityOperationsSlice.reducer;
