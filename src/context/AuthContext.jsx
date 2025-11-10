import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Restore session on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setRole(parsedUser?.role || "member");
    }

    setLoading(false);
  }, []);

  // Handle login
  const login = async (credentials) => {
    try {
      const res = await api.post("/auth/login", credentials);
      const { token, refresh_token, user } = res.data;

      localStorage.setItem("token", token);
      if (refresh_token) localStorage.setItem("refresh_token", refresh_token);
      localStorage.setItem("user", JSON.stringify(user));

      api.defaults.headers.Authorization = `Bearer ${token}`;
      setUser(user);
      setRole(user.role);

      toast.success(`Welcome back, ${user.name || "User"}!`);
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
      const message =
        err.response?.data?.message || "Invalid credentials or network error.";
      toast.error(message);
      throw err;
    }
  };

  // Handle logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    setUser(null);
    setRole(null);
    delete api.defaults.headers.Authorization;
    toast.info("You have been logged out.");
    navigate("/login");
  };

  const isAuthenticated = !!user;
  const isAdmin = role === "admin";
  const isMember = role === "member";

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated,
        isAdmin,
        isMember,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
