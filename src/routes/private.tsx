import { useAuth0 } from "@auth0/auth0-react";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading)
    return (
      <main className="min-h-screen bg-gray-950 text-gray-200">
        Carregando...
      </main>
    );

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default AuthGuard;
