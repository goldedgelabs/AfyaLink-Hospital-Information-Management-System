'use client';
import { useEffect, useState } from 'react';
export default function HospitalsPage() {
  const [h, setH] = useState([]);
  useEffect(
    () =>
      fetch('/mock-server/data/hospitals.json')
        .then((r) => r.json())
        .then(setH),
    [],
  );
  return (
    <div className="p-6">
      <h1 className="text-2xl">Hospitals</h1>
      <div className="grid gap-3 mt-4">
        {h.map((ho) => (
          <div key={ho.id} className="card p-3">
            <strong>{ho.name}</strong>
            <div>{ho.location}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
