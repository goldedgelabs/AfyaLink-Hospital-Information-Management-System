// src/context/AuthContext.js
'use client';
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { id, name, role, avatar, email }
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // restore from localStorage for demo mode
    const saved = localStorage.getItem('afya:user');
    if (saved) {
      setUser(JSON.parse(saved));
    } else {
      // default demo user can be null or a superadmin for dev
      // setUser({ id: 'u_demo', name: 'Demo Admin', role: 'superadmin', avatar: '/avatar.png' });
    }
    setLoading(false);
  }, []);

  function loginMock({ id = 'u1', name = 'Super Admin', role = 'superadmin', email = 'admin@afya.test', avatar = '/avatar-placeholder.png' }) {
    const u = { id, name, role, email, avatar };
    localStorage.setItem('afya:user', JSON.stringify(u));
    setUser(u);
  }

  function logout() {
    localStorage.removeItem('afya:user');
    setUser(null);
  }

  // utility: check role
  function hasRole(allowed = []) {
    if (!user) return false;
    if (!Array.isArray(allowed)) allowed = [allowed];
    return allowed.includes(user.role);
  }

  return (
    <AuthContext.Provider value={{ user, loading, loginMock, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
}
