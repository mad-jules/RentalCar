import type { Car } from "./Car";

export interface fetchCarsParams {
  brand?: string;
  rentalPrice?: string;
  minMileage?: string;
  maxMileage?: string;
  limit?: string;
  page?: number;
}

export interface GetCarsResponse {
  cars: Car[];
  totalCars: number;
  page: number;
  totalPages: number;
}
