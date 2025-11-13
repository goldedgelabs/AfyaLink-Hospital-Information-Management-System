'use client';

import { useContext } from 'react';
import { ThemeContext } from '@/context/ThemeContext';

export default function ThemeSwitcher() {
  const { dark, setDark } = useContext(ThemeContext);

  return (
    <div className="flex items-center gap-2">
      <label className="text-gray-700 font-medium">Dark</label>
      <input
        type="checkbox"
        checked={dark}
        onChange={() => setDark(!dark)}
        className="w-5 h-5 rounded border-gray-300 focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
}
