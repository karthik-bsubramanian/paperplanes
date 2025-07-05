import { Navigate } from "react-router-dom";
import { useHydratedUser } from "../hooks/HydratedUser";
import { Loading } from "./Loading";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, hydrated } = useHydratedUser();

  if (!hydrated) return <Loading />;

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
};
