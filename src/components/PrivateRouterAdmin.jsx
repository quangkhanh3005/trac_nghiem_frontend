import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRouteAdmin = ({ children }) => {
  const role = sessionStorage.getItem("role");

  if (role != "USER") {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default PrivateRouteAdmin;
