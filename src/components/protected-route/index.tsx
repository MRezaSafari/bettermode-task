import { useServerStore } from "@bettermode/stores";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = useServerStore((state) => state.token);
  if (!import.meta.env.SSR && !token) {
    return <Navigate to="/auth/signup" replace />;
  }

  return children;
};

export default ProtectedRoute;
