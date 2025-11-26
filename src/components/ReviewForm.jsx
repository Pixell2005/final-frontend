import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";

export default function ReviewForm({ onSubmit }) {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);

  async function submit(e) {
    e.preventDefault();
    if (!text.trim()) return;
    setSubmitting(true);
    try {
      await onSubmit({ text, rating: Number(rating), date: new Date().toISOString() });
      setText("");
      setRating(5);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <motion.form
      onSubmit={submit}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        p-6 rounded-2xl mb-8
        bg-white dark:bg-slate-800
        text-gray-800 dark:text-gray-200
        border border-gray-200 dark:border-slate-700
        transition-colors duration-500
      "
    >
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <FiStar className="text-yellow-500" /> Write a Review
      </h3>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Your Rating</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`text-2xl transition-transform hover:scale-110 ${
                star <= rating 
                  ? "text-yellow-400" 
                  : "text-gray-300 dark:text-gray-600"
              }`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Your Thoughts</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="
            w-full rounded-lg p-3 h-24 resize-none
            bg-gray-100 dark:bg-slate-700
            text-gray-900 dark:text-gray-100
            border border-gray-300 dark:border-slate-600
            transition-colors duration-500
            outline-none focus:ring-2 focus:ring-blue-400
          "
          placeholder="What did you think about this movie?"
          required
        />
      </div>

      <button 
        type="submit" 
        disabled={submitting}
        className="
          px-6 py-2 rounded-lg
          bg-gradient-to-r from-blue-600 to-blue-500 
          hover:brightness-110 
          text-white font-semibold
          transition-all duration-300
        "
      >
        {submitting ? "Posting..." : "Post Review"}
      </button>
    </motion.form>
  );
}
