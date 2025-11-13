// src/components/ThemeToggle.js
"use client";
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";

export default function ThemeToggle() {
  const { dark, setDark } = useContext(ThemeContext);
  return (
    <div className="flex items-center gap-2">
      <label className="text-sm">Dark</label>
      <input type="checkbox" checked={dark} onChange={() => setDark(!dark)} />
    </div>
  );
}
