import type { Car } from "../../types";
import { Button } from "../Button/Button";
import { Icon, ICON_NAMES } from "../Icon/Icon";
import { formatNumberString } from "../../utils/formatStringNumber";
import { useTranslation } from "react-i18next";

import css from "./CarCard.module.css";
import clsx from "clsx";

interface Props {
  car: Car;
  onFavorite: (id: string) => void;
  isFavorite: boolean;
}

export function CarCard({ car, onFavorite, isFavorite }: Props) {
  const [, city, country] = car.address.split(", ");
  const { t } = useTranslation();

  return (
    <div className={css.card}>
      <div>
        <img
          className={css.image}
          src={car.img}
          alt={`Car ${car.brand} ${car.model}`}
        />

        <div className={css.title_wrap}>
          <h2 className={css.title}>
            {car.brand} <span className={css.accent}>{car.model}</span>&#44;{" "}
            {car.year}
          </h2>
          <p>&#36;{car.rentalPrice}</p>
        </div>
        <ul className={css.info_list}>
          <div className={css.list_wrap}>
            {[city, country, car.rentalCompany].map((el) => (
              <li className={css.list_item} key={el}>
                {el}
                <Icon
                  className={css.icon_splitter}
                  name={ICON_NAMES.SPLITTER}
                  width={2}
                  height={16}
                />
              </li>
            ))}
          </div>
          <div className={css.list_wrap}>
            {[car.type, formatNumberString(String(car.mileage))].map((el) => (
              <li className={css.list_item} key={el}>
                {el}
                <Icon
                  className={css.icon_splitter}
                  name={ICON_NAMES.SPLITTER}
                  width={2}
                  height={16}
                />
              </li>
            ))}
          </div>
        </ul>
        <Icon
          className={clsx(css.icon_heart, { [css.active]: isFavorite })}
          style={{ cursor: "pointer" }}
          onClick={() => {
            onFavorite(car.id);
          }}
          name={isFavorite ? ICON_NAMES.HEART_FILL : ICON_NAMES.HEART}
        />
      </div>
      <Button to={`/catalog/${car.id}`}>{t("CatalogPage.readMore")}</Button>
    </div>
  );
}
