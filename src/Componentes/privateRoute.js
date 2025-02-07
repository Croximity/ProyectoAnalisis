import React from "react";
import { Navigate, Outlet } from "react-router-dom";

/**
 * Ruta privada que protege las páginas y redirige a "/login" si el usuario no está autenticado.
 */
const PrivateRoute = () => {
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

