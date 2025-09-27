import css from "./Home.module.css";
import { Container } from "../../components/Container/Container";
import { Button } from "../../components/Button/Button";
import { useTranslation } from "react-i18next";

export function HomePage() {
  const { t } = useTranslation();

  return (
    <section className={css.hero_section}>
      <Container className={css.hero_container}>
        <h1 className={css.hero_title}>{t("HomePage.title")}</h1>
        <h2 className={css.hero_subtitle}>{t("HomePage.subtitle")}</h2>
        <Button className={css.hero_button} type="button" to="/catalog">
          {t("HomePage.button")}
        </Button>
      </Container>
    </section>
  );
}
