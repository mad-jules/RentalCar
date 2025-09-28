import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";
import { Suspense } from "react";
import { Loader } from "../Loader/Loader";

export function SharedLayout() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<Loader isFixedCenter />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
}
