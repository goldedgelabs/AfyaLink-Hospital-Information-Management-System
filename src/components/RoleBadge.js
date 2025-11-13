// src/components/RoleBadge.js
export default function RoleBadge({ role = "patient" }) {
  const color = role === "superadmin" ? "bg-purple-600" : role === "doctor" ? "bg-green-600" : "bg-blue-600";
  return <span className={`text-xs px-2 py-1 rounded ${color} text-white`}>{role}</span>;
    }
