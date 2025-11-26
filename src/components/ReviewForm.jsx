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
      className="glass-panel p-6 rounded-2xl mb-8"
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
                star <= rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
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
          className="input-modern h-24 resize-none"
          placeholder="What did you think about this movie?"
          required
        />
      </div>

      <button type="submit" disabled={submitting} className="btn-gradient w-full md:w-auto">
        {submitting ? "Posting..." : "Post Review"}
      </button>
    </motion.form>
  );
}