'use client';

import SuperAdminNavbar from '@/components/SuperAdminNavbar';
import SuperAdminSidebar from '@/components/SuperAdminSidebar';
import { useState } from 'react';

export default function SuperAdminLayout({ children }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex h-screen">
      <SuperAdminSidebar open={open} setOpen={setOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <SuperAdminNavbar setOpen={setOpen} />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
    }
