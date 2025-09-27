import React, { useEffect, useRef, useState } from "react";
import { getBrands, getCars } from "../../services/carService";
import {
  Dropdown,
  type DropdownItem,
  type OnSelectArg,
} from "../../components/Dropdown/Dropdown";
import { useCarStore } from "../../store";
import { CarList } from "../../components/CarList/CarList";
import { InputGroup } from "../../components/InputGroup/InputGroup";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import type { fetchCarsParams } from "../../types";
import type { CarFilter } from "../../store/car";
import { Container } from "../../components/Container/Container";
import css from "./Catalog.module.css";
import { formatNumberString } from "../../utils/formatStringNumber";
import { useTranslation } from "react-i18next";
import { blurOnMouseUp } from "../../utils/Handler";

export function CatalogPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [brands, setBrands] = useState<DropdownItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { t } = useTranslation();

  const [rentalData] = useState(() =>
    Array.from({ length: 20 }, (_, i) => {
      const step = (i + 1) * 10;
      return { label: String(step), value: String(step) };
    })
  );

  const {
    cars,
    setCars,

    appendCars,
    clearCars,

    filter,
    updateFilters,
  } = useCarStore();

  useEffect(() => {
    const initializeData = async () => {
      try {
        const fetchedBrands = await getBrands();
        const initialCars = await getCars({ page: 1 });
        // name adn value required for separate ui and logic by the way we have same values
        setBrands(fetchedBrands.map((b) => ({ label: b, value: b })));
        setCars(initialCars.cars);
        setTotalPages(initialCars.totalPages);
        setCurrentPage(1);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        console.log("Enter pressed!");
        handleSubmit();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleSubmit]);

  const handleSelect = ({ id, value }: OnSelectArg) => {
    updateFilters({ [id]: value });
  };

  const handleOnChangeMileage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    let value = e.target.value;

    const cleanValue = value.replace(/\D/g, "");

    updateFilters({ [name]: cleanValue });
  };

  const prepareCarParams = (
    filter: CarFilter & { page: number }
  ): fetchCarsParams => {
    const params: fetchCarsParams = { page: 1 };

    const entries = Object.entries(filter) as [
      keyof CarFilter,
      string | null,
    ][];

    entries.forEach(([key, value]) => {
      if (value != null && value !== "") {
        params[key] = value;
      }
    });

    return params;
  };

  async function handleSubmit() {
    setIsLoading(true);
    clearCars();
    const { cars, totalPages } = await getCars(
      prepareCarParams({ ...filter, page: 1 })
    );
    setTotalPages(totalPages);
    setCurrentPage(1);
    setCars(cars);
    setIsLoading(false);
  }

  const handleLoadMore = async () => {
    const { cars } = await getCars(
      prepareCarParams({ ...filter, page: currentPage + 1 })
    );

    setCurrentPage((prev) => (prev += 1));

    appendCars(cars);
  };
  console.log("cars", cars);
  return (
    <Container className={css.catalog_container}>
      <div className={css.filter}>
        <div>
          <p className={css.label}>{t("CatalogPage.brand")}</p>
          <Dropdown
            title={t("CatalogPage.chooseBrand")}
            id="brand"
            data={brands}
            onSelect={handleSelect}
            selectedValue={filter.brand}
          />
        </div>

        <div>
          <p className={css.label}>{t("CatalogPage.price")}</p>
          <Dropdown
            title={t("CatalogPage.choosePrice")}
            id="rentalPrice"
            data={rentalData}
            onSelect={handleSelect}
            selectedValue={filter.rentalPrice}
          />
        </div>
        <div>
          <p className={css.label}> {t("CatalogPage.InputGroup.mileage")}</p>

          <InputGroup>
            <Input
              name="minMileage"
              label={t("CatalogPage.InputGroup.from")}
              value={
                filter.minMileage ? formatNumberString(filter.minMileage) : ""
              }
              onChange={handleOnChangeMileage}
            />
            <Input
              name="maxMileage"
              label={t("CatalogPage.InputGroup.to")}
              value={
                filter.maxMileage ? formatNumberString(filter.maxMileage) : ""
              }
              onChange={handleOnChangeMileage}
            />
          </InputGroup>
        </div>
        <Button onClick={handleSubmit} onMouseUp={blurOnMouseUp}>
          {t("CatalogPage.search")}
        </Button>
      </div>
      {isLoading ? <>loading..</> : <CarList cars={cars} />}
      {totalPages > 1 && currentPage < totalPages ? (
        <Button
          style={{ margin: "auto" }}
          onClick={handleLoadMore}
          onMouseUp={blurOnMouseUp}
        >
          {t("CatalogPage.loadMore")}
        </Button>
      ) : null}
    </Container>
  );
}
