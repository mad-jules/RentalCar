import type { Car, GetCarsResponse, fetchCarsParams } from "../types";

import { CarsInstanceClient } from "./api";

export async function getCars(
  options: fetchCarsParams
): Promise<GetCarsResponse> {
  const { limit = "12", ...params } = options;

  const res = await CarsInstanceClient.get<GetCarsResponse>("/cars", {
    params: {
      ...params,
      limit,
    },
  });
  return res.data;
}

export async function getBrands(): Promise<string[]> {
  const res = await CarsInstanceClient.get<string[]>("/brands");
  return res.data;
}

export async function getCarById(id: string): Promise<Car> {
  const res = await CarsInstanceClient.get<Car>(`/cars/${id}`);
  return res.data;
}
