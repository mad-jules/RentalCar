import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

// to do translaion.json https://kenobiwins.github.io
const FRONTEND_BASE_URL = "";

export const supportedLanguages = {
  en: "EN",
  uk: "UA",
};

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(Backend)
  .init({
    supportedLngs: Object.keys(supportedLanguages),
    backend: {
      loadPath: `${FRONTEND_BASE_URL}/locales/{{lng}}/translation.json`,
    },
    fallbackLng: "uk",
    debug: true,
    detection: {
      order: ["localStorage", "cookie"],
    },
    interpolation: {
      escapeValue: false,
    },
  });
