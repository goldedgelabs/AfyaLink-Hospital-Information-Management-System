import Link from 'next/link';
import Image from 'next/image';

export default function AdminSidebar() {
  return (
    <aside className="w-64 h-screen bg-white shadow-md flex flex-col p-4">
      {/* Logo at the top */}
      <div className="flex items-center space-x-2 mb-8">
        <Image
          src="/logo.png"
          alt="AfyaLink Logo"
          width={48}
          height={48}
          className="rounded-lg"
        />
        <span className="text-xl font-bold text-gray-800">
          AfyaLink Infinity
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-2">
        <Link
          href="/admin/dashboard"
          className="px-4 py-2 rounded hover:bg-gray-100"
        >
          Dashboard
        </Link>
        <Link
          href="/admin/patients"
          className="px-4 py-2 rounded hover:bg-gray-100"
        >
          Patients
        </Link>
        <Link
          href="/admin/appointments"
          className="px-4 py-2 rounded hover:bg-gray-100"
        >
          Appointments
        </Link>
        <Link
          href="/admin/labs"
          className="px-4 py-2 rounded hover:bg-gray-100"
        >
          Labs
        </Link>
        <Link
          href="/admin/pharmacy"
          className="px-4 py-2 rounded hover:bg-gray-100"
        >
          Pharmacy
        </Link>
        <Link
          href="/admin/settings"
          className="px-4 py-2 rounded hover:bg-gray-100"
        >
          Settings
        </Link>
      </nav>
    </aside>
  );
}
