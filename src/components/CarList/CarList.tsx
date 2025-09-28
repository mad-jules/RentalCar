import { useCarStore } from "../../store";
import type { Car } from "../../types";
import { CarCard } from "../CarCard/CarCard";
import { NotFound } from "../NotFound/NotFound";

import css from "./CarList.module.css";

interface Props {
  cars: Car[];
}

export function CarList({ cars }: Props) {
  const { favorite, toggleFavorite } = useCarStore();

  return (
    <>
      {!cars.length ? (
        <NotFound />
      ) : (
        <ul className={css.list}>
          {cars.map((car) => (
            <li key={car.id}>
              <CarCard
                car={car}
                isFavorite={favorite.includes(car.id)}
                onFavorite={toggleFavorite}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
