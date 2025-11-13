// src/components/RequireRole.js
"use client";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function RequireRole({ allowed = [], children, fallback=null }) {
  const { user, loading, hasRole } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      // if user is not present or doesn't have role, redirect to home or show fallback
      if (!user || !hasRole(allowed)) {
        // for preview: redirect to /
        router.push("/");
      }
    }
  }, [loading, user, allowed]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!user || !hasRole(allowed)) {
    // If you prefer an inline message instead of redirect, return fallback
    if (fallback) return fallback;
    return null;
  }

  return children;
}
