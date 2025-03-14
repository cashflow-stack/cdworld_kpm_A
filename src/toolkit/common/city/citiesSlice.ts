import { getCities } from "@/api/citiesApi";
import { City } from "@/models/API";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CustomerState = {
  cities: City[];
  status: "idle" | "loading" | "failed" | "success" | "empty";
  error?: string;
};

const initialState: CustomerState = {
  cities: [],
  status: "idle",
  error: undefined,
};

/**
 * Fetches cities based on the provided circle ID and circle date of creation.
 *
 * @param circleID - The ID of the circle.
 * @param circleDateOfCreation - The date of creation of the circle.
 * @returns A promise that resolves to the response containing the fetched cities.
 * @throws An error if there is an issue with fetching the cities.
 */
export const fetchCities = createAsyncThunk(
  "cities/fetchCities",
  async ({
    circleID,
    circleDateOfCreation,
  }: {
    circleID: string;
    circleDateOfCreation: string;
  }) => {
    try {
      const response = await getCities({ circleID, circleDateOfCreation });
      return response;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);

const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    onCityAdded: (state, action: PayloadAction<City>) => {
      state.cities.push(action.payload);
    },
    onCityUpdated: (state, action: PayloadAction<City>) => {
      const { id } = action.payload;
      const existingCity = state.cities.find((city) => city.id === id);
      if (existingCity) {
        Object.assign(existingCity, action.payload);
      }
    },
    onCityDeleted: (state, action: PayloadAction<City>) => {
      const { id } = action.payload;
      state.cities = state.cities.filter((city) => city.id !== id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.pending, (state) => {
        state.status = "loading";
        state.error = undefined;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.status = action.payload.length ? "success" : "empty";
        state.cities = action.payload;
        state.error = undefined;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload
          ? String(action.payload)
          : "An unknown error occurred";
      });
  },
});

export default citiesSlice.reducer;
export const { onCityAdded, onCityUpdated, onCityDeleted } = citiesSlice.actions;