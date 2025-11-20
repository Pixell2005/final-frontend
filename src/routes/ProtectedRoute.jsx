import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, role }) {
  const { user } = useAuth();

  // Not logged in at all
  if (!user) return <Navigate to="/login" />;

  // Logged in but role doesn't match
  if (role && user.role !== role) return <Navigate to="/" />;

  return children;
}
