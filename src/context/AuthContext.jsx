// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));

  const login = (userData, token) => {
    setUser(userData);
    setAccessToken(token);
    localStorage.setItem("accessToken", token);
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem("accessToken");
  };

  useEffect(() => {
    if (accessToken && !user) {
      // You can replace this with your actual user fetching logic
      setUser({ username: "DevUser" });
    }
  }, [accessToken, user]);

  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
