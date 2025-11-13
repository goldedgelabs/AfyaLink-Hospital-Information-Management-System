'use client';

export default function StatsCard({ title, value }) {
  return (
    <div className="card p-4 bg-white shadow rounded-md">
      <div className="text-xs text-gray-500">{title}</div>
      <div className="text-2xl font-bold text-gray-900 mt-1">{value}</div>
    </div>
  );
}
