import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import App from "./App.tsx";
import { ThemeProvider } from "./theme/ThemeProvider.tsx";

import "./globals.module.css";
import "./i18n";
import "react-datepicker/dist/react-datepicker.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter basename="/">
        <App />
      </BrowserRouter>
      <ToastContainer />
    </ThemeProvider>
  </StrictMode>
);
