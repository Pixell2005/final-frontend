import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getMovie, updateMovie } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function MovieDetail() {
  const { id } = useParams();
  const { user } = useAuth();

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
    } catch {
      alert("Failed to add review");
    }
  }

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!movie) return <p className="text-center mt-10">Movie not found.</p>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-5xl mx-auto mt-8 p-4 text-gray-900 dark:text-gray-100"
    >
      {/* BACK BUTTON */}
      <motion.div whileHover={{ x: -3 }}>
        <Link
          to="/"
          className="inline-block mb-6 font-medium text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← Back to Home
        </Link>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-10">
        {/* POSTER IMAGE */}
        <motion.img
          src={movie.poster}
          alt={movie.title}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="w-full md:w-80 rounded-xl shadow-2xl object-cover"
        />

        {/* MOVIE INFO */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex-1"
        >
          {/* TITLE */}
          <h1 className="text-4xl font-extrabold mb-2 text-gray-900 dark:text-gray-100">
            {movie.title}
            <span className="text-2xl text-gray-700 dark:text-gray-300">
              {" "}
              ({movie.year})
            </span>
          </h1>

          <p className="text-lg text-gray-800 dark:text-gray-300 mb-4">
            {movie.genre}
          </p>

          {/* SUMMARY */}
          <p className="mb-4 leading-relaxed text-gray-900 dark:text-gray-200">
            {movie.summary || "No summary available."}
          </p>

          {/* PRODUCER */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Producer</h3>
            <p className="text-gray-800 dark:text-gray-300">
              {movie.producer || "Unknown"}
            </p>
          </div>

          {/* CAST */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold">Cast</h3>
            {movie.cast?.length > 0 ? (
              <ul className="list-disc list-inside text-gray-900 dark:text-gray-200">
                {movie.cast.map((actor, i) => (
                  <li key={i}>{actor}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                No cast information.
              </p>
            )}
          </div>

          {/* RATING */}
          {movie.reviews.length > 0 ? (
            <p className="text-xl font-semibold mb-4 text-yellow-500">
              ⭐
              {(
                movie.reviews.reduce((a, b) => a + b.rating, 0) /
                movie.reviews.length
              ).toFixed(1)}{" "}
              / 5
            </p>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              No ratings yet
            </p>
          )}

          {/* EDIT MOVIE (ADMIN ONLY) */}
          {user?.role === "admin" && (
            <Link
              to={`/admin/edit/${movie.id}`}
              className="px-5 py-2 inline-block bg-blue-600 text-white dark:bg-blue-500 rounded-lg shadow hover:bg-blue-700 dark:hover:bg-blue-600"
            >
              Edit Movie
            </Link>
          )}

          <hr className="my-6 border-gray-300 dark:border-gray-700" />

          {/* REVIEWS */}
          <h2 className="text-2xl font-bold mb-3">Reviews</h2>

          {movie.reviews.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              No reviews yet
            </p>
          ) : (
            <div className="space-y-4 mb-6">
              {movie.reviews.map((rev, idx) => (
                <div
                  key={idx}
                  className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow border border-gray-200 dark:border-gray-700"
                >
                  <p className="font-semibold text-yellow-500">
                    ⭐ {rev.rating}/5
                  </p>
                  <p className="text-gray-900 dark:text-gray-200 mt-1">
                    {rev.text}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {new Date(rev.date).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* ADD REVIEW */}
          {user ? (
            <motion.form
              onSubmit={addReview}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-900 shadow-lg p-5 rounded-xl border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-xl font-bold mb-3">Add Review</h3>

              <label className="block mb-2 font-medium">Rating</label>
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="border rounded px-3 py-2 mb-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 border-gray-300 dark:border-gray-700"
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
                className="w-full border rounded px-3 py-2 h-28 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200"
                placeholder="Write your thoughts..."
              />

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="mt-4 w-full bg-blue-600 dark:bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600"
              >
                Submit Review
              </motion.button>
            </motion.form>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 mt-4">
              You must{" "}
              <Link to="/login" className="text-blue-600 dark:text-blue-400 underline">
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
