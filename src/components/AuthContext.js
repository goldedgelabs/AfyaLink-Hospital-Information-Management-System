// src/context/AuthContext.js
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// 1️⃣ Create the context
const AuthContext = createContext();

// 2️⃣ Provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { name, email, role }
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simulate fetching user data from localStorage or API
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login simulation
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3️⃣ Custom hook for consuming the context
export function useAuth() {
  return useContext(AuthContext);
    }
