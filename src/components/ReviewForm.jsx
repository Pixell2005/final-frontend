import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

export default function ReviewForm({ onSubmit }) {
  const { user } = useAuth();
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);

  async function submit(e) {
    e.preventDefault();
    if (!text.trim()) return alert("Tulis review terlebih dahulu");

    setSubmitting(true);

    const newReview = { 
      text: text.trim(), 
      rating: Number(rating), 
      date: new Date().toISOString(),
      username: user?.username || "Unknown"
    };

    await axios.post(
      "http://localhost:3001/reviews",
      newReview);

    try {
      await onSubmit(newReview);
      setText("");
      setRating(5);
    } catch (err) {
      console.error(err);
      alert("Gagal menambahkan review");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <motion.form
      onSubmit={submit}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white shadow-lg p-5 rounded-xl border"
    >
      <h3 className="text-xl font-bold mb-3">Add Review</h3>

      <label className="block mb-2 font-medium">Rating</label>
      <select
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        className="border rounded px-3 py-2 mb-4"
      >
        <option value={5}>⭐⭐⭐⭐⭐</option>
        <option value={4}>⭐⭐⭐⭐</option>
        <option value={3}>⭐⭐⭐</option>
        <option value={2}>⭐⭐</option>
        <option value={1}>⭐</option>
      </select>

      <label className="block mb-2 font-medium">Your Review</label>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full border rounded px-3 py-2 h-28"
        placeholder="Write your thoughts..."
      />

      <motion.button
        whileTap={{ scale: 0.98 }}
        whileHover={{ y: -2 }}
        type="submit"
        disabled={submitting}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-60"
      >
        {submitting ? "Submitting..." : "Submit Review"}
      </motion.button>
    </motion.form>
  );
}
