import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/auth/login" />;
  return children;
};

export const AdminRoute = ({ children }) => {
  const { user, role } = useAuth();
  if (!user) return <Navigate to="/auth/login" />;
  if (role !== "admin") return <Navigate to="/dashboard/user" />;
  return children;
};

export const UserRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/auth/login" />;
  return children;
};