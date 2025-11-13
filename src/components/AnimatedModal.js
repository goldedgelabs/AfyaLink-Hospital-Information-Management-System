'use client';
import { motion } from 'framer-motion';

export default function AnimatedModal({ children, open, onClose }) {
  if (!open) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="card p-4"
      >
        {children}
        <button
          onClick={onClose}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
}
