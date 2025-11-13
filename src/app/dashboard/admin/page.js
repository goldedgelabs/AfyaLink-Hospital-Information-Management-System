'use client';
import AdminSidebar from '@/components/AdminSidebar';
import { useEffect, useState } from 'react';
export default function AdminPage() {
  const [logs, setLogs] = useState([]);
  useEffect(() => setLogs([{ id: 1, msg: 'System started' }]), []);
  return (
    <div style={{ display: 'flex' }}>
      <AdminSidebar />
      <div className="p-6 flex-1">
        <h1 className="text-2xl">Admin Console</h1>
        <div className="mt-4 card p-3">System logs</div>
      </div>
    </div>
  );
}
