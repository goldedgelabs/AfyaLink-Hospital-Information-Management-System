"use client";
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeContext } from '@/context/ThemeContext';
import { AuthContext } from '@/context/AuthContext';
import { Bell, Brain, Menu } from 'lucide-react';

export default function SuperAdminNavbar() {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const __ThemeContext_ctx = useContext(ThemeContext);
const { theme, toggleTheme  } = __ThemeContext_ctx || {};
  const { user } = useContext(AuthContext);

  return (
    <nav
      className={`flex items-center justify-between px-6 py-3 sticky top-0 z-50 backdrop-blur-lg transition-all ${
        theme === 'dark'
          ? 'bg-gray-900/60 text-gray-100'
          : 'bg-white/60 text-gray-800 shadow-md'
      }`}
    >
      {/* Left: Logo + Title */}
      <div className="flex items-center space-x-3">
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-200/30"
        >
          <Menu size={22} />
        </button>

        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.png"
            alt="AfyaLink Logo"
            width={42}
            height={42}
            className="rounded-lg shadow-sm"
          />
          <span className="font-extrabold text-xl tracking-wide">
            AfyaLink Infinity
          </span>
        </Link>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center space-x-4">
        {/* AI Assist */}
        <button
          className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-500 text-white rounded-xl shadow hover:opacity-90 transition-all"
          onClick={() => alert('Launching NeuroEdge AI Assistant...')}
        >
          <Brain size={18} /> <span className="text-sm font-medium">NeuroEdge</span>
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-full hover:bg-gray-200/30 dark:hover:bg-gray-700/50">
          <Bell size={20} />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full animate-ping"></span>
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdown(!dropdown)}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <Image
              src={user?.avatar || '/avatar.png'}
              alt="Admin Avatar"
              width={36}
              height={36}
              className="rounded-full border border-gray-300"
            />
            <span className="hidden md:inline font-medium">
              {user?.name || 'SuperAdmin'}
            </span>
            <svg
              className={`w-4 h-4 transition-transform ${
                dropdown ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <AnimatePresence>
            {dropdown && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className={`absolute right-0 mt-2 w-52 rounded-xl border ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700 text-gray-200'
                    : 'bg-white border-gray-200 text-gray-800 shadow-lg'
                }`}
              >
                <Link
                  href="/profile"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-xl"
                >
                  Profile
                </Link>
                <Link
                  href="/settings"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Settings
                </Link>
                <button
                  onClick={toggleTheme}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </button>
                <Link
                  href="/logout"
                  className="block px-4 py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b-xl"
                >
                  Logout
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
              }