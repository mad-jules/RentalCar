import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
import { SharedLayout } from "./components/SharedLayout/SharedLayout";

const HomePage = lazy(() =>
  import("./pages/HomePage/Home").then((module) => ({
    default: module.HomePage,
  }))
);
const CatalogPage = lazy(() =>
  import("./pages/Catalog/Catalog").then((module) => ({
    default: module.CatalogPage,
  }))
);
const CatalogByIdPage = lazy(() =>
  import("./pages/CatalogById/CatalogById").then((module) => ({
    default: module.CatalogByIdPage,
  }))
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<HomePage />} />
        <Route path="catalog" element={<CatalogPage />} />
        <Route path="catalog/:id" element={<CatalogByIdPage />} />
      </Route>
    </Routes>
  );
}

export default App;
