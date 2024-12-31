"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="flex h-[500px] items-center justify-center">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="mb-4 text-6xl font-bold text-gray-800">404</h1>
          <h2 className="mb-6 text-3xl font-semibold text-gray-600">
            Page Not Found
          </h2>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mb-8 text-xl text-gray-500"
        >
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Link
            href="/"
            className="rounded-lg bg-blue-500 px-6 py-3 text-white transition-colors duration-300 hover:bg-blue-600"
          >
            Return Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
