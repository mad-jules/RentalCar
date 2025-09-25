import React from "react";

import { DataAttr, LocalStorageKey, ThemeVariant } from "./constants";
import { setLocalStorageItem } from "../utils/LocalStorage";
import { initialiseTheme } from "./utils";

interface ThemeContextType {
  theme: ThemeVariant;
  setTheme: (theme: ThemeVariant) => void;
  toggleTheme: () => void;
}

export const ThemeContext = React.createContext<ThemeContextType | undefined>(
  undefined
);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = React.useState<ThemeVariant>(initialiseTheme);

  const setTheme = (newTheme: ThemeVariant) => {
    document.documentElement.setAttribute(DataAttr.DATA_THEME, newTheme);
    setLocalStorageItem(LocalStorageKey.THEME_VARIANT, newTheme);
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    switch (theme) {
      case ThemeVariant.LIGHT:
        setTheme(ThemeVariant.DARK);
        break;
      case ThemeVariant.DARK:
        setTheme(ThemeVariant.LIGHT);
        break;

      default:
        setTheme(ThemeVariant.LIGHT);
        break;
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
