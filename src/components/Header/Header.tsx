import { Link, NavLink } from "react-router-dom";
import { Container } from "../Container/Container";
import css from "./Header.module.css";
import { Icon, ICON_NAMES } from "../Icon/Icon";
import { useTheme } from "../../theme/useTheme";
import { useTranslation } from "react-i18next";
import { supportedLanguages } from "../../i18n";
import { blurOnMouseUp } from "../../utils/Handler";
import { useState } from "react";
import {
  Dropdown,
  type DropdownItem,
  type OnSelectArg,
} from "../Dropdown/Dropdown";

export function Header() {
  const { toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();

  // Стан обраної мови
  const [lang, setLang] = useState(i18n.language);

  // Дані для Dropdown
  const dropdownData: DropdownItem[] = Object.entries(supportedLanguages).map(
    ([key, label]) => ({ value: key, label })
  );

  // Обробник вибору мови
  const handleSelect = (item: OnSelectArg) => {
    setLang(item.value);
    i18n.changeLanguage(item.value);
  };

  return (
    <>
      <header className={css.header}>
        <Container>
          <nav className={css.nav}>
            <Link to={"/"} className={css.logo}>
              <Icon
                color="inherit"
                name={ICON_NAMES.LOGO}
                width={102}
                height={16}
              />
            </Link>

            <div className={css.header_wrapper}>
              <Dropdown
                id="lang"
                title="Select language"
                data={dropdownData}
                selectedValue={lang}
                onSelect={handleSelect}
              />

              <button
                onMouseUp={blurOnMouseUp}
                className={css.theme_btn}
                type="button"
                onClick={toggleTheme}
              >
                {t("Header.theme")}
              </button>

              <ul className={css.ul}>
                <li className={css.li}>
                  <NavLink
                    onMouseUp={blurOnMouseUp}
                    className={css.link}
                    to={"/"}
                  >
                    {t("Header.home")}
                  </NavLink>
                </li>
                <li className={css.li}>
                  <NavLink
                    onMouseUp={blurOnMouseUp}
                    className={css.link}
                    to={"/catalog"}
                  >
                    {t("Header.catalog")}
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
        </Container>
      </header>
    </>
  );
}
