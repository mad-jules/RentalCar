import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

const HomePage = lazy(() =>
  import("./pages/HomePage/Home").then((module) => ({
    default: module.HomePage,
  }))
);
const CatalogPage = lazy(() =>
  import("./pages/Catalog").then((module) => ({ default: module.CatalogPage }))
);
const CatalogByIdPage = lazy(() =>
  import("./pages/CatalogById").then((module) => ({
    default: module.CatalogByIdPage,
  }))
);

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/:id" element={<CatalogByIdPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
