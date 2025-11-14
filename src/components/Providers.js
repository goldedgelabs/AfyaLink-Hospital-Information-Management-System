'use client';
import React from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';

/**
 * Top-level client-side providers wrapper.
 * Keeps the RootLayout as a server component while providing
 * client-only contexts to all descendants (navbar, pages, etc.)
 */
export default function Providers({ children }) {
  return (
    <AuthProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </AuthProvider>
  );
}
