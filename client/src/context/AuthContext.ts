import { createContext } from "react";

interface AuthContextType {
  user: { id: number; email: string } | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});
