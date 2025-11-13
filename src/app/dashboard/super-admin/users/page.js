'use client';
import { useState, useEffect } from 'react';
import DataTable from '@/components/DataTable';
import AnimatedModal from '@/components/AnimatedModal';
export default function UsersPage() {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  useEffect(
    () =>
      fetch('/mock-server/data/users.json')
        .then((r) => r.json())
        .then(setRows),
    [],
  );
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Users</h1>
      <button
        className="btn-primary mt-3 p-2 rounded"
        onClick={() => setOpen(true)}
      >
        Create User
      </button>
      <DataTable rows={rows} />
      <AnimatedModal open={open} onClose={() => setOpen(false)}>
        <div>Create user form (mock)</div>
      </AnimatedModal>
    </div>
  );
}
