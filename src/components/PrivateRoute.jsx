import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";


const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();
  console.log("Privet " , isAuthenticated)
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;