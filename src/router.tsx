import { Route, Routes } from "react-router-dom";
import { IPostsData } from "./models";
import { NotFound } from "./pages/_layout/not-found";
import { AboutPage } from "./pages/about";
import LoginPage from "./pages/authentication/login";
import VerifyPage from "./pages/authentication/verify";
import HomePage from "./pages/home";

export const Router = ({ posts }: { posts?: IPostsData }) => {
  return (
    <Routes>
      <Route path="/" element={<HomePage posts={posts} />} />
      <Route path="/auth/signup" element={<LoginPage />} />
      <Route path="/auth/verify" element={<VerifyPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
