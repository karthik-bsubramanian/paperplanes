import { Navigate } from "react-router-dom";

type props = {
    isAuthenticated: boolean;
    children: React.ReactNode

}
export const ProtectedRoutes = ({isAuthenticated,children}:props)=>{
    if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}