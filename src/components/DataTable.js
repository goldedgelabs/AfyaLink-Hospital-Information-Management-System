'use client';

export default function DataTable({ rows }) {
  return (
    <table className="w-full border-collapse border border-gray-200">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2 text-left border-b border-gray-300">Name</th>
          <th className="px-4 py-2 text-left border-b border-gray-300">Role</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.id} className="hover:bg-gray-50">
            <td className="px-4 py-2 border-b border-gray-200">
              {r.name || r.fullName}
            </td>
            <td className="px-4 py-2 border-b border-gray-200">
              {r.role || r.specialty || 'n/a'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
