"use client";
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { ThemeContext } from '@/context/ThemeContext';
import {
  LayoutDashboard,
  Users,
  Hospital,
  Microscope,
  Pill,
  ShieldCheck,
  BarChart3,
  Brain,
  Settings,
  LogOut,
} from 'lucide-react';

export default function SuperAdminSidebar({ open, setOpen }) {
  const pathname = usePathname();
  const __ThemeContext_ctx = useContext(ThemeContext);
const { theme } = __ThemeContext_ctx || {};

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard/super-admin' },
    { name: 'Hospitals', icon: Hospital, href: '/dashboard/hospital' },
    { name: 'Doctors', icon: Users, href: '/dashboard/doctor' },
    { name: 'Laboratories', icon: Microscope, href: '/dashboard/lab' },
    { name: 'Pharmacy', icon: Pill, href: '/dashboard/pharmacist' },
    { name: 'Insurance', icon: ShieldCheck, href: '/dashboard/insurance' },
    { name: 'Analytics', icon: BarChart3, href: '/dashboard/ai-analytics' },
    { name: 'NeuroEdge AI', icon: Brain, href: '/dashboard/ai' },
  ];

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: open ? 0 : -300 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className={`fixed top-0 left-0 h-full w-72 z-40 p-5 flex flex-col justify-between
        ${theme === 'dark'
          ? 'bg-gray-900/70 text-gray-200 border-r border-gray-800'
          : 'bg-white/60 backdrop-blur-lg border-r border-gray-200 text-gray-800'
        } shadow-xl`}
    >
      {/* Top Section */}
      <div>
        <h1 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
          SuperAdmin Panel
        </h1>

        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all
                  ${
                    active
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-500 text-white shadow-md'
                      : theme === 'dark'
                        ? 'hover:bg-gray-800/80'
                        : 'hover:bg-gray-200/50'
                  }`}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Settings */}
      <div className="space-y-2">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-100/50 dark:hover:bg-gray-800/70"
        >
          <Settings size={18} /> Settings
        </Link>
        <Link
          href="/logout"
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-red-500 hover:bg-red-100/40 dark:hover:bg-gray-800/70"
        >
          <LogOut size={18} /> Logout
        </Link>
      </div>
    </motion.aside>
  );
            } 