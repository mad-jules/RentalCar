import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Car, fetchCarsParams, Nullable } from "../types";

export interface CarFilter
  extends Required<Nullable<Omit<fetchCarsParams, "page" | "limit">>> {}

type CarStoreState = {
  cars: Car[] | null;
  filter: CarFilter;
  favorite: string[];
};

type CarStoreActions = {
  setCars: (cars: Car[]) => void;
  appendCars: (cars: Car[]) => void;
  clearCars: () => void;
  updateFilters: (filters: Partial<CarFilter>) => void;
  clearFilters: () => void;
  toggleFavorite: (id: string) => void;
};

type CarStore = CarStoreState & CarStoreActions;

const INITIAL_CARS = null;
const INITIAL_FAVORITES: string[] = [];
const INITIAL_FILTERS: CarFilter = {
  brand: null,
  maxMileage: null,
  minMileage: null,
  rentalPrice: null,
};

export const useCarStore = create<CarStore>()(
  persist(
    (set) => ({
      cars: INITIAL_CARS,
      filter: INITIAL_FILTERS,
      favorite: INITIAL_FAVORITES,
      setCars(cars) {
        set({ cars });
      },
      appendCars(cars) {
        set((state) => {
          if (!state.cars) {
            return { cars: [...cars] };
          }
          return {
            cars: [...state.cars, ...cars],
          };
        });
      },
      clearCars() {
        set({ cars: INITIAL_CARS });
      },
      updateFilters(filters) {
        set((state) => {
          return { filter: { ...state.filter, ...filters } };
        });
      },
      clearFilters() {
        set({ filter: INITIAL_FILTERS });
      },
      toggleFavorite(id: string) {
        set((state) => ({
          favorite: state.favorite.includes(id)
            ? state.favorite.filter((favId) => favId !== id)
            : [...state.favorite, id],
        }));
      },
    }),
    {
      name: "car-storage",
      partialize: (state) => ({ favorite: state.favorite }),
    }
  )
);
