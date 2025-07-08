// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProtectedRoute() {
  const { accessToken } = useAuth();

  return accessToken ? <Outlet /> : <Navigate to="/" replace />;
}
