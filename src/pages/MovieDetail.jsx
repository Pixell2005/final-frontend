import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getMovie, updateMovie } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function MovieDetail() {
  const { id } = useParams();
  const { user } = useAuth();   // <-- FIX LOGIN CHECK
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getMovie(id);
        if (!res.data.reviews) res.data.reviews = [];
        setMovie(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  // --------------------------
  // ADD REVIEW (ONLY FOR USERS)
  // --------------------------
  async function addReview(e) {
    e.preventDefault();

    if (!user) {
      alert("You must login to write reviews.");
      return;
    }

    const newReview = {
      user: user.username,
      text: reviewText,
      rating: Number(rating),
      date: new Date().toISOString(),
    };

    const updatedMovie = {
      ...movie,
      reviews: [...movie.reviews, newReview],
    };

    try {
      await updateMovie(movie.id, updatedMovie);
      setMovie(updatedMovie);
      setReviewText("");
      setRating(5);
    } catch (err) {
      alert("Failed to add review");
    }
  }

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!movie) return <p className="text-center mt-10">Movie not found.</p>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-5xl mx-auto mt-8 p-4"
    >
      {/* Back Button */}
      <motion.div whileHover={{ x: -3 }}>
        <Link
          to="/"
          className="inline-block mb-6 text-blue-600 font-medium hover:underline"
        >
          ← Back to Home
        </Link>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-10">
        <motion.img
          src={movie.poster}
          alt={movie.title}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full md:w-80 rounded-xl shadow-2xl object-cover"
        />

        {/* Movie Info */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1"
        >
          <h1 className="text-4xl font-extrabold mb-2">
            {movie.title}{" "}
            <span className="text-gray-500 text-2xl">({movie.year})</span>
          </h1>

          <p className="text-lg text-gray-600 mb-4">{movie.genre}</p>

          {/* Rating Average */}
          {movie.reviews.length > 0 ? (
            <p className="text-yellow-500 text-xl font-semibold mb-4">
              ⭐
              {(
                movie.reviews.reduce((a, b) => a + b.rating, 0) /
                movie.reviews.length
              ).toFixed(1)}{" "}
              / 5
            </p>
          ) : (
            <p className="text-gray-500 mb-4">No ratings yet</p>
          )}

          {/* EDIT BUTTON - ONLY ADMIN */}
          {user?.role === "admin" && (
            <Link
              to={`/admin/edit/${movie.id}`}
              className="mt-4 inline-block px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
            >
              Edit Movie
            </Link>
          )}

          <hr className="my-6" />

          {/* Reviews */}
          <h2 className="text-2xl font-bold mb-3">Reviews</h2>

          {movie.reviews.length === 0 ? (
            <p className="text-gray-500 mb-4">No reviews yet</p>
          ) : (
            <div className="space-y-4 mb-6">
              {movie.reviews.map((rev, idx) => (
                <div
                  key={idx}
                  className="bg-gray-100 p-4 rounded-xl shadow border border-gray-200"
                >
                  <p className="font-semibold text-yellow-600">
                    ⭐ {rev.rating}/5
                  </p>
                  <p className="text-gray-700 mt-1">{rev.text}</p>
                  <p className="text-gray-500 text-sm mt-1">
                    {new Date(rev.date).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* ADD REVIEW FORM - ONLY IF LOGGED IN */}
          {user ? (
            <motion.form
              onSubmit={addReview}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
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
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full border rounded px-3 py-2 h-28"
                placeholder="Write your thoughts..."
              />

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Submit Review
              </motion.button>
            </motion.form>
          ) : (
            <p className="text-gray-500 mt-4">
              You must{" "}
              <Link to="/login" className="text-blue-600 underline">
                login
              </Link>{" "}
              to write a review.
            </p>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
