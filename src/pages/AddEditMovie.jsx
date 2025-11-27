import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { createMovie, getMovie, updateMovie } from "../services/api";
import { GENRES } from "../pages/genres";

export default function AddEditMovie() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [poster, setPoster] = useState("");
  const [rating, setRating] = useState(0);

  // HERO LANDSCAPE
  const [heroImage, setHeroImage] = useState("");

  // NEW FIELDS
  const [trailer, setTrailer] = useState("");
  const [summary, setSummary] = useState("");
  const [producer, setProducer] = useState("");
  const [cast, setCast] = useState("");

  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // helper for base64
  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handlePoster = async (file) => {
    const base64 = await convertToBase64(file);
    setPoster(base64);
  };

  const handleHero = async (file) => {
    const base64 = await convertToBase64(file);
    setHeroImage(base64);
  };

  // Load movie for edit
  useEffect(() => {
    if (isEdit) {
      getMovie(id).then((res) => {
        const m = res.data;
        setTitle(m.title);
        setYear(m.year);
        setGenre(m.genre);
        setPoster(m.poster);
        setRating(m.rating || 0);

        setHeroImage(m.heroImage || "");
        setTrailer(m.trailer || "");
        setSummary(m.summary || "");
        setProducer(m.producer || "");
        setCast(m.cast ? m.cast.join(", ") : "");
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !year || !genre || !poster) {
      alert("Semua field wajib diisi!");
      return;
    }

    const payload = {
      title,
      year,
      genre,
      poster,
      heroImage,
      trailer,
      summary,
      producer,
      cast: cast.split(",").map((c) => c.trim()),
      rating,
      review: [],
    };

    setLoading(true);
    try {
      isEdit ? await updateMovie(id, payload) : await createMovie(payload);
      navigate("/");
    } catch (err) {
      alert("Error saving movie!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <motion.div
        className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 
                   bg-white/20 backdrop-blur-xl shadow-xl 
                   rounded-3xl border border-white/20 p-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* POSTER UPLOAD */}
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-gray-100">
            {isEdit ? "Edit Movie" : "Add New Movie"}
          </h2>

          {/* Poster */}
          <div
            className="w-full aspect-[2/3] rounded-xl border-2 border-white/20 
                       bg-black/40 flex items-center justify-center cursor-pointer"
            onClick={() => document.getElementById("posterInput").click()}
          >
            {poster ? (
              <img
                src={poster}
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <p className="text-gray-300 text-center">Upload Poster</p>
            )}
          </div>
          <input
            type="file"
            id="posterInput"
            accept="image/*"
            className="hidden"
            onChange={(e) => handlePoster(e.target.files[0])}
          />

          {/* HERO LANDSCAPE */}
          <label className="text-gray-100 font-semibold mt-4">
            Hero Landscape Image
          </label>
          <div
            className="w-full aspect-video rounded-xl border-2 border-white/20 
                       bg-black/40 flex items-center justify-center cursor-pointer"
            onClick={() => document.getElementById("heroInput").click()}
          >
            {heroImage ? (
              <img
                src={heroImage}
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <p className="text-gray-300 text-center">Upload Hero Landscape</p>
            )}
          </div>
          <input
            type="file"
            id="heroInput"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleHero(e.target.files[0])}
          />
        </div>

        {/* FORM */}
        <motion.form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >
          {/* Title */}
          <div>
            <label className="text-gray-100 font-semibold">Title</label>
            <input
              className="w-full px-4 py-3 rounded-xl bg-white/30"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Year */}
          <div>
            <label className="text-gray-100 font-semibold">Year</label>
            <input
              type="number"
              className="w-full px-4 py-3 rounded-xl bg-white/30"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>

          {/* Genre */}
          <div>
            <label className="text-gray-100 font-semibold">Genre</label>
            <select
              className="w-full px-4 py-3 rounded-xl bg-white/30"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            >
              <option value="">Select genre...</option>
              {GENRES.map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </div>

          {/* Trailer */}
          <div>
            <label className="text-gray-100 font-semibold">Trailer Link</label>
            <input
              className="w-full px-4 py-3 rounded-xl bg-white/30"
              value={trailer}
              onChange={(e) => setTrailer(e.target.value)}
              placeholder="https://youtube.com/..."
            />
          </div>

          {/* Summary */}
          <div>
            <label className="text-gray-100 font-semibold">Summary</label>
            <textarea
              className="w-full h-28 px-4 py-3 rounded-xl bg-white/30"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
          </div>

          {/* Producer */}
          <div>
            <label className="text-gray-100 font-semibold">Producer</label>
            <input
              className="w-full px-4 py-3 rounded-xl bg-white/30"
              value={producer}
              onChange={(e) => setProducer(e.target.value)}
            />
          </div>

          {/* Cast */}
          <div>
            <label className="text-gray-100 font-semibold">Cast (comma separated)</label>
            <input
              className="w-full px-4 py-3 rounded-xl bg-white/30"
              value={cast}
              onChange={(e) => setCast(e.target.value)}
              placeholder="Leonardo DiCaprio, Emma Stone, ..."
            />
          </div>

          {/* Rating */}
          <div>
            <label className="text-gray-100 font-semibold">Rating</label>
            <div className="flex gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  onClick={() => setRating(i + 1)}
                  className={`text-3xl cursor-pointer ${
                    i + 1 <= rating ? "text-yellow-400" : "text-gray-600"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          {/* SUBMIT */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            className="w-full py-3 bg-indigo-600 rounded-xl text-white font-semibold"
          >
            {loading ? "Saving..." : isEdit ? "Save Changes" : "Add Movie"}
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
}
