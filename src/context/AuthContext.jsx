// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(() =>
    localStorage.getItem("accessToken")
  );
  const [loading, setLoading] = useState(true);

  const login = useCallback((userData, token) => {
    setUser(userData);
    setAccessToken(token);
    localStorage.setItem("accessToken", token);
    // Persist user data so it survives a page refresh
    localStorage.setItem("user", JSON.stringify(userData));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  }, []);

  // On mount: rehydrate user from localStorage so refreshing the page
  // doesn't log the user out while the token is still valid.
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setAccessToken(token);
      } catch {
        // Corrupted storage — clear it
        logout();
      }
    }
    setLoading(false);
  }, [logout]);

  const isLoggedIn = !!user && !!accessToken;

  // Don't render children until auth state is known — prevents flash of
  // unauthenticated UI on hard refresh.
  if (loading) return null;

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};