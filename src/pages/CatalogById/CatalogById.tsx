import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCarById } from "../../services/carService";
import type { Car } from "../../types";
import { Input } from "../../components/Input/Input";
import { toast } from "react-toastify";
import css from "./CatalogById.module.css";
import { Container } from "../../components/Container/Container";
import { useTranslation } from "react-i18next";
import { formatNumberString } from "../../utils/formatStringNumber";
import { Icon, ICON_NAMES } from "../../components/Icon/Icon";
import { TextArea } from "../../components/TextArea/TextArea";
import { DatePicker } from "../../components/DatePicker/DatePicker";
import { Button } from "../../components/Button/Button";

interface ListItem {
  label: string | number;
  icon?: ICON_NAMES;
}

interface InfoGroupProps {
  title: string;
  items: ListItem[];
}

interface BookingForm {
  name: string;
  email: string;
  bookingDate: Date | null;
  comment: string;
}

const INITIAL_FORM_STATE = {
  name: "",
  email: "",
  bookingDate: null,
  comment: "",
};

export function CatalogByIdPage() {
  const { t } = useTranslation();

  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Car | null>(null);
  const [form, setForm] = useState<BookingForm>(INITIAL_FORM_STATE);

  useEffect(() => {
    if (!id) return;
    getCarById(id).then(setCar);
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name: string, date: Date | null) => {
    setForm((prev) => ({ ...prev, [name]: date }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const toastMessage = `Thank you, ${form.name}! Your booking${
      form.bookingDate
        ? ` for ${new Date(form.bookingDate).toLocaleString()}`
        : ""
    } has been received. We’ll reach out to you at ${form.email} if needed.${
      form.comment ? ` Comment noted: "${form.comment}".` : ""
    }`;

    toast.success(toastMessage);
    setForm(INITIAL_FORM_STATE);
  };

  const renderInfoGroup = ({ title, items }: InfoGroupProps) => {
    return (
      <div>
        <h3 className={css.info_group_title}>{title}</h3>
        <ul className={css.info_group_list}>
          {items.map((item, index) => (
            <li className={css.info_group_item} key={index}>
              {item.icon && <Icon name={item.icon} />}
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return car ? (
    <section className={css.car_section}>
      <Container>
        <div className={css.wrapper}>
          <div style={{ flex: 1 }}>
            <img
              className={css.img}
              src={car.img}
              alt={`Car ${car.brand} ${car.model}`}
            />

            <form className={css.form} onSubmit={handleSubmit}>
              <div className={css.form_head}>
                <h3>{t("CatalogById.form.title")}</h3>
                <p>{t("CatalogById.form.subtitle")}</p>
              </div>
              <div className={css.form_group}>
                <Input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t("CatalogById.form.name")}
                  required
                />
                <Input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder={t("CatalogById.form.email")}
                  type="email"
                  required
                />

                <DatePicker
                  name="bookingDate"
                  selected={form.bookingDate}
                  onChange={handleDateChange}
                  dateFormat="yyyy-MM-dd HH:mm"
                  placeholderText={t("CatalogById.form.bookingDate")}
                />

                <TextArea
                  rows={4}
                  name="comment"
                  value={form.comment}
                  onChange={handleChange}
                  placeholder={t("CatalogById.form.comment")}
                />
                <Button type="submit">{t("CatalogById.form.submit")}</Button>
              </div>
            </form>
          </div>
          <div className={css.car_info}>
            <div style={{ marginBottom: 32 }}>
              <div className={css.title_wrap}>
                <h2 className={css.title}>
                  {car.brand} {car.model}&#44; {car.year}
                </h2>
                <p className={css.id}>
                  {t("CatalogById.id")}: {car.id.split("-").slice(2, 3)}
                </p>
              </div>
              <div className={css.location}>
                <p>
                  <Icon
                    className={css.icon_location}
                    name={ICON_NAMES.LOCATION}
                  />
                  {car.address.split(", ").slice(1, 2)}&#44;{" "}
                  {car.address.split(", ").slice(2, 3)}
                </p>
                <p>
                  {t("CatalogById.mileage")}:{" "}
                  {formatNumberString(String(car.mileage))}
                </p>
              </div>
              <p className={css.price}>&#36;{car.rentalPrice}</p>
            </div>
            <p style={{ marginBottom: 68 }}>{car.description}</p>
            <div className={css.info_groups_wrapper}>
              {renderInfoGroup({
                title: t("CatalogById.rentalConditions"),
                items: car.rentalConditions.map((el) => ({
                  label: el,
                  icon: ICON_NAMES.CHECK_CIRCLE,
                })),
              })}

              {renderInfoGroup({
                title: t("CatalogById.carSpecifications"),
                items: [
                  {
                    label: `${t("CatalogById.year")}: ${car.year}`,
                    icon: ICON_NAMES.CALENDAR,
                  },
                  {
                    label: `${t("CatalogById.type")}: ${car.type}`,
                    icon: ICON_NAMES.CAR,
                  },
                  {
                    label: `${t("CatalogById.fuelConsumption")}: ${car.fuelConsumption}`,
                    icon: ICON_NAMES.FUEL_PUMP,
                  },
                  {
                    label: `${t("CatalogById.engineSize")}: ${car.engineSize}`,
                    icon: ICON_NAMES.GEAR,
                  },
                ],
              })}

              {renderInfoGroup({
                title: t("CatalogById.accessoriesAndFunctionalities"),
                items: [
                  ...car.accessories.map((el) => ({
                    label: el,
                    icon: ICON_NAMES.CHECK_CIRCLE,
                  })),
                  ...car.functionalities.map((el) => ({
                    label: el,
                    icon: ICON_NAMES.CHECK_CIRCLE,
                  })),
                ],
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  ) : null;
}
