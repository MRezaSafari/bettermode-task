import { Route, Routes } from "react-router-dom";
import { NotFound } from "./pages/_layout/not-found";
import { AboutPage } from "./pages/about";
import LoginPage from "./pages/authentication/login";
import HomePage from "./pages/home";


export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/other" element={<AboutPage />} />
      <Route path="/auth/signup" element={<LoginPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};