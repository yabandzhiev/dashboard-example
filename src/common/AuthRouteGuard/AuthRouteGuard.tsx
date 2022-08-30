import { Outlet, Navigate } from "react-router-dom";

const AuthRouteGuard = () => {
  const email = localStorage.getItem("email");

  if (!email) {
    return <Navigate to="/login" />;
  } else {
    return <Outlet />;
  }
};

export default AuthRouteGuard;
