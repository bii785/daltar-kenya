"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import apiRequest from "@/lib/api";
import type { AuthTokenResponse, AuthUser } from "@/lib/types";

interface RegisterInput {
  email: string;
  password: string;
  full_name: string;
  company_name?: string;
}

interface LoginInput {
  email: string;
  password: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  login: (input: LoginInput) => Promise<void>;
  register: (input: RegisterInput) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const TOKEN_STORAGE_KEY = "daltar_access_token";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // On first load, check for a token saved from a previous session and
  // validate it against /me — this is what keeps someone logged in across
  // a page refresh instead of losing their session every time.
  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (!storedToken) {
      setIsLoading(false);
      return;
    }

    apiRequest<AuthUser>("/api/auth/me", {
      headers: { Authorization: `Bearer ${storedToken}` }
    })
      .then((me) => {
        setToken(storedToken);
        setUser(me);
      })
      .catch(() => {
        // Token expired, revoked, or invalid — clear it silently.
        localStorage.removeItem(TOKEN_STORAGE_KEY);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const applySession = useCallback((session: AuthTokenResponse) => {
    localStorage.setItem(TOKEN_STORAGE_KEY, session.access_token);
    setToken(session.access_token);
    setUser(session.user);
  }, []);

  const login = useCallback(
    async (input: LoginInput) => {
      const session = await apiRequest<AuthTokenResponse>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(input)
      });
      applySession(session);
    },
    [applySession]
  );

  const register = useCallback(
    async (input: RegisterInput) => {
      const session = await apiRequest<AuthTokenResponse>("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(input)
      });
      applySession(session);
    },
    [applySession]
  );

  const logout = useCallback(async () => {
    if (token) {
      try {
        await apiRequest("/api/auth/logout", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch {
        // Even if the network call fails, still clear client-side state —
        // the person clicked logout, they should end up logged out locally.
      }
    }
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setToken(null);
    setUser(null);
  }, [token]);

  const value = useMemo(
    () => ({ user, token, isLoading, login, register, logout }),
    [user, token, isLoading, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
