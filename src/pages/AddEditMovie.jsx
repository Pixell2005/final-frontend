import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { createMovie, getMovie, updateMovie } from "../services/api";
import { GENRES } from "../pages/genres"; // Update import

export default function AddEditMovie() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [poster, setPoster] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // Hapus GENRES array lokal, gunakan dari constants

  // =========================
  // LOAD MOVIE IF EDIT MODE
  // =========================
  useEffect(() => {
    if (isEdit) {
      getMovie(id).then((res) => {
        const m = res.data;
        setTitle(m.title);
        setYear(m.year);
        setGenre(m.genre);
        setPoster(m.poster);
        setRating(m.rating || 0);
      });
    }
  }, [id]);

  // =========================
  // HANDLE DRAG & DROP FILE
  // =========================
  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleFile = async (file) => {
    const base64 = await convertToBase64(file);
    setPoster(base64);
  };

  const onDrop = useCallback(
    async (e) => {
      e.preventDefault();
      setDragActive(false);
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        await handleFile(file);
      }
    },
    []
  );

  const onDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const onDragLeave = () => {
    setDragActive(false);
  };

  const handleFileInput = async (e) => {
    const file = e.target.files[0];
    if (file) await handleFile(file);
  };

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !year || !genre || !poster) {
      alert("Semua field wajib diisi!");
      return;
    }

    const payload = { title, year, genre, poster, rating, review: [] };

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
        className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 
                   bg-white/20 backdrop-blur-xl shadow-xl 
                   rounded-3xl border border-white/20 p-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* POSTER SECTION */}
        <motion.div
          className="flex flex-col gap-4"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-2xl font-bold text-gray-100">
            {isEdit ? "Edit Movie" : "Add New Movie"}
          </h2>

          {/* DROPZONE */}
          <div
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            className={`w-full aspect-[2/3] rounded-xl border-2 
                       flex items-center justify-center cursor-pointer
                       transition 
                       ${dragActive ? "border-indigo-400 bg-indigo-400/20"
                                     : "border-white/20 bg-black/40"}`}
            onClick={() => document.getElementById("fileInput").click()}
          >
            {poster ? (
              <img src={poster} className="w-full h-full object-cover rounded-xl" />
            ) : (
              <p className="text-gray-300 text-center px-4">
                Drag & Drop poster here<br />or click to upload
              </p>
            )}
          </div>

          {/* HIDDEN FILE INPUT */}
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            className="hidden"
            onChange={handleFileInput}
          />
        </motion.div>

        {/* FORM SECTION */}
        <motion.form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {/* title */}
          <div>
            <label className="text-gray-100 font-semibold">Title</label>
            <input
              className="w-full px-4 py-3 rounded-xl bg-white/30"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* year */}
          <div>
            <label className="text-gray-100 font-semibold">Year</label>
            <input
              type="number"
              className="w-full px-4 py-3 rounded-xl bg-white/30"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>

          {/* genre */}
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

          {/* rating */}
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