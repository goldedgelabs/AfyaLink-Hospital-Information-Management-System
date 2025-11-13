'use client';
import RequireRole from '@/components/RequireRole';
import DoctorNotesUploader from '@/components/DoctorNotesUploader';
import MachineIntegration from '@/components/MachineIntegration';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

export default function DoctorDashboardPage() {
  const { user } = useContext(AuthContext);

  return (
    <RequireRole allowed={['doctor', 'nurse', 'lab']}>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-5xl mx-auto space-y-6">
          <header className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">
              👨‍⚕️ Doctor Dashboard
            </h1>
            <p className="text-gray-600">
              Logged in as: <strong>{user?.name || 'Doctor'}</strong>
            </p>
          </header>

          <section className="space-y-4">
            <DoctorNotesUploader />
            <MachineIntegration />
          </section>

          <footer className="text-center text-sm text-gray-500 mt-8">
            © {new Date().getFullYear()} AfyaLink Infinity — Doctor Portal
          </footer>
        </div>
      </div>
    </RequireRole>
  );
    }
