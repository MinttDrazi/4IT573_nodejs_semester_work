// src/ProtectedRoute.tsx
import { Navigate } from "react-router";
import type { JSX } from "react";
import { useAuth } from "./hooks/useAuth";

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();

  if (loading) {
    // ještě čekáme na ověření; můžeš zobrazit spinner
    return <div>Loading...</div>;
  }

  if (!user) {
    // není přihlášen → přesměruj na login
    return <Navigate to="/login" replace />;
  }

  // je přihlášen → vykresli chráněnou routu
  return children;
}
