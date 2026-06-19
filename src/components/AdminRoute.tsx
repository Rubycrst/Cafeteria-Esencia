import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-coffee-50/50">
        <div className="animate-spin w-8 h-8 border-4 border-coffee-700 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  if (profile?.role !== "admin") return <Navigate to="/dashboard" replace />;

  return <>{children}</>;
}
