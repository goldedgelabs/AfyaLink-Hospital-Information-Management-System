'use client';
import RequireRole from '@/components/RequireRole';
import PatientCapture from '@/components/PatientCapture';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

export default function PatientDashboardPage() {
  const { user } = useContext(AuthContext);

  return (
    <RequireRole allowed={['patient']}>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <header className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">
              🩺 Patient Dashboard
            </h1>
            <p className="text-gray-600">
              Welcome, <strong>{user?.name || 'Patient'}</strong>
            </p>
          </header>

          <section className="space-y-4">
            <PatientCapture />
          </section>

          <footer className="text-center text-sm text-gray-500 mt-8">
            © {new Date().getFullYear()} AfyaLink Infinity — Patient Portal
          </footer>
        </div>
      </div>
    </RequireRole>
  );
  }
