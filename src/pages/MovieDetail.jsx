import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovie, updateMovie } from "../services/api";
import ReviewForm from "../components/ReviewForm";
import ReviewItem from "../components/ReviewItem";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMovie(id)
      .then((res) => {
        const movieData = res.data;

        // Pastikan reviews tidak undefined
        if (!movieData.reviews) movieData.reviews = [];

        setMovie(movieData);
        setLoading(false);
      })
      .catch(() => {
        alert("Failed to load movie detail");
        setLoading(false);
      });
  }, [id]);

  function addReview(review) {
    const updatedMovie = {
      ...movie,
      reviews: [...movie.reviews, review]
    };

    updateMovie(id, updatedMovie)
      .then(() => {
        setMovie(updatedMovie);
      })
      .catch(() => alert("Failed to submit review"));
  }

  if (loading) return <p className="text-center mt-6">Loading...</p>;
  if (!movie) return <p className="text-center mt-6">Movie not found.</p>;

  const avgRating =
    movie.reviews.length > 0
      ? (
          movie.reviews.reduce((sum, r) => sum + Number(r.rating), 0) /
          movie.reviews.length
        ).toFixed(1)
      : "-";

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        to="/"
        className="inline-block mb-4 text-blue-600 hover:underline text-lg"
      >
        ← Back to Home
      </Link>

      <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* Poster */}
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-[450px] object-cover"
        />

        {/* Content */}
        <div className="p-6">
          <h1 className="text-4xl font-extrabold mb-2">{movie.title}</h1>

          <p className="text-gray-600 mb-1">
            {movie.year} • {movie.genre}
          </p>

          <p className="text-yellow-500 text-xl font-semibold mb-4">
            ⭐ {avgRating} / 5
          </p>

          {/* Reviews */}
          <h2 className="text-2xl font-bold mt-6 mb-3">Reviews</h2>

          <div className="space-y-3">
            {movie.reviews.length > 0 ? (
              movie.reviews.map((review, i) => (
                <ReviewItem key={i} review={review} />
              ))
            ) : (
              <p className="text-gray-500">Belum ada review.</p>
            )}
          </div>

          {/* Add Review Form */}
          <ReviewForm onSubmit={addReview} />
        </div>
      </div>
    </div>
  );
}
