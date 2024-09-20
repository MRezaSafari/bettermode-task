import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components";
import { IPostNode, IPostsData } from "./models";

import { NotFound } from "./pages/_layout/not-found";
import { AboutPage } from "./pages/about";
import LoginPage from "./pages/authentication/login";
import VerifyPage from "./pages/authentication/verify";
import HomePage from "./pages/home";
import PostPage from "./pages/post";

interface IProps {
  posts?: IPostsData;
  post?: IPostNode;
}

export const Router = ({ posts, post }: IProps) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage posts={posts} />
          </ProtectedRoute>
        }
      />
      <Route path="/auth/signup" element={<LoginPage />} />
      <Route path="/auth/verify" element={<VerifyPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/products/post/:slug" element={<PostPage post={post} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
