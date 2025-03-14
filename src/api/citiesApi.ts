import { byCircleCity } from "@/models/queries";
import { client } from "./queryProvider";
import { City, CreateCityInput, UpdateCityInput } from "@/models/API";
import { createCity, deleteCity, updateCity } from "@/models/mutations";

interface CityProps {
  circleID: string;
  circleDateOfCreation: string;
}

export const getCities = async ({
  circleID,
  circleDateOfCreation,
}: CityProps): Promise<City[]> => {
  try {
    const { data, errors } = await client.graphql({
      query: byCircleCity,
      variables: {
        circleID,
        circleDateOfCreation: { eq: circleDateOfCreation },
        limit: 15000,
      },
    });

    if (errors) {
      console.error(JSON.stringify(errors, null, 2));
      throw new Error(errors[0].message);
    }

    const cities: City[] = data.byCircleCity.items;
    return cities;
  } catch (error: any) {
    console.table(error);
    throw new Error(error);
  }
};

type CityInputProps = {
  adminID: string;
  circleDateOfCreation: string;
  circleID: string;
  name: string;
};

export const addNewCity = async ({ ...p }: CityInputProps): Promise<City> => {
  const cityInput: CreateCityInput = {
    adminID: p.adminID,
    circleDateOfCreation: p.circleDateOfCreation,
    circleID: p.circleID,
    name: p.name,
  };
  try {
    const { data, errors } = await client.graphql({
      query: createCity,
      variables: { input: cityInput },
    });
    if (errors) {
      console.error(JSON.stringify(errors, null, 2));
      throw new Error(errors[0].message);
    }
    const newCity: City = data.createCity as City;
    return newCity;
  } catch (error: any) {
    console.table(error);
    throw new Error(error);
  }
};

export const updateCityInfo = async ({
  updatedCity,
}: {
  updatedCity: UpdateCityInput;
}): Promise<City> => {
  try {
    const { data, errors } = await client.graphql({
      query: updateCity,
      variables: { input: updatedCity },
    });
    if (errors) {
      console.error(JSON.stringify(errors, null, 2));
      throw new Error(errors[0].message);
    }
    const newCity: City = data.updateCity as City;
    return newCity;
  } catch (error: any) {
    console.table(error);
    throw new Error(error);
  }
};


export const deleteExistingCity = async ({ cityID, adminId }: { cityID: string, adminId: string }): Promise<City> => {
  try {
    const { data, errors } = await client.graphql({
      query: deleteCity,
      variables: { input: { id: cityID, adminID: adminId } },
    });
    if (errors) {
      console.error(JSON.stringify(errors, null, 2));
      throw new Error(errors[0].message);
        }
        const deletedCity: City = data.deleteCity as City;
        return deletedCity;
    }
    catch (error: any) {
        console.table(error);
        throw new Error(error);
    }
}