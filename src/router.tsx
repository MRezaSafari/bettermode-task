import { Route, Routes } from "react-router-dom";
import { NotFound } from "./pages/_layout/not-found";
import { AboutPage } from "./pages/about";
import HomePage from "./pages/home";


export const Router = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/other" element={<AboutPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};