import React from "react";
import { motion } from "framer-motion";

const itemVariants = {
  hidden: { opacity: 0, y: 8, scale: 0.99 },
  enter: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: "easeOut" } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

export default function ReviewItem({ review }) {
  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="enter"
      exit="exit"
      className="
        bg-gray-100 dark:bg-slate-800 
        text-gray-800 dark:text-gray-200
        p-4 rounded-xl shadow-sm 
        border border-gray-200 dark:border-slate-700
        transition-colors duration-500
      "
    >
      {/* Username */}
      <p className="font-semibold text-blue-600 dark:text-blue-400 mb-1">
        {review.username || "Anonymous"}
      </p>

      <div className="flex items-center justify-between">
        <p className="font-semibold text-yellow-600 dark:text-yellow-400">
          ⭐ {review.rating}/5
        </p>
        <p className="text-gray-400 dark:text-gray-500 text-sm">
          {review.date ? new Date(review.date).toLocaleString() : ""}
        </p>
      </div>

      <p className="mt-2">
        {review.text}
      </p>
    </motion.div>
  );
}
