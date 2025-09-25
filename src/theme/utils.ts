import { getLocalStorageItem } from "../utils/LocalStorage";
import { LocalStorageKey, ThemeVariant } from "./constants";

const MATCH_MEDIA_RULE = "(prefers-color-scheme: dark)";

type StorageThemeType = ThemeVariant | null;

export function initialiseTheme() {
  const root = document.documentElement;
  const savedTheme = getLocalStorageItem<StorageThemeType>(
    LocalStorageKey.THEME_VARIANT
  );
  console.log("saved", savedTheme);

  if (savedTheme) {
    root.setAttribute("data-theme", savedTheme);
    return savedTheme;
  }

  const prefersDark = window.matchMedia(MATCH_MEDIA_RULE).matches;
  const preferedTheme = prefersDark ? ThemeVariant.DARK : ThemeVariant.LIGHT;
  root.setAttribute("data-theme", preferedTheme);

  return prefersDark ? ThemeVariant.DARK : ThemeVariant.LIGHT;
}
