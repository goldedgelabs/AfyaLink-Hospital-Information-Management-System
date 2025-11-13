'use client';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export default function Charts() {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      {
        label: 'Patients',
        data: [12, 19, 7, 14, 9],
        fill: false,
        borderColor: '#4f46e5', // Tailwind Indigo
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="card p-3 bg-white shadow rounded-md">
      <Line data={data} />
    </div>
  );
}
