import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();

  if (loading) return <p className="p-6">Loading...</p>;

  return user ? children : <Navigate to="/login" replace />;
}
