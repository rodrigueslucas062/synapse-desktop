import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router";
import { auth } from "../../../utils/firebase";
import { load } from "@tauri-apps/plugin-store";

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: any;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  error: string | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const store = await load("auth.dat", { autoSave: true });
      const localUser = await store.get("user");

      if (localUser) {
        setCurrentUser(localUser);
      }

      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          const basicInfo = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          };

          setCurrentUser(basicInfo);
          setIsAuthenticated(true);
          await store.set("user", basicInfo);
        } else {
          setCurrentUser(null);
          setIsAuthenticated(false);
          await store.delete("user");
        }
        setLoading(false);
      });

      return unsubscribe;
    })();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      let errorMessage = "";
      if (error.code === "auth/invalid-credential") {
        errorMessage = "Email ou senha inválidos.";
      } else {
        errorMessage = "Ocorreu um erro ao realizar essa solicitação.";
      }
      setError(errorMessage);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const value: AuthContextType = {
    isAuthenticated,
    currentUser,
    loading,
    login,
    error,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
