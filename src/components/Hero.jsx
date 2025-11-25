import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const posters = [
  "/images/narnia.jpeg",
  "/images/straight.jpeg",
  "/images/summer.jpeg",
  "/images/john.jpeg",
];

export default function Hero() {
  const { user } = useAuth();
  const [index, setIndex] = useState(0);
  const [pause, setPause] = useState(false);

  // AUTO SLIDE
  useEffect(() => {
    if (pause) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % posters.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [pause]);

  const nextSlide = () => setIndex((prev) => (prev + 1) % posters.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + posters.length) % posters.length);

  return (
    <section className="relative overflow-hidden px-10 py-24 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200">
      {/* BACKGROUND GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/10 to-gray-300/30 backdrop-blur-sm"></div>

      {/* TEXT */}
      <motion.div
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl relative z-10"
      >
        <h1 className="text-6xl font-extrabold text-gray-900 leading-tight drop-shadow-md">
          Discover movies.
          <br /> Write reviews.
          <br /> Share feelings.
        </h1>

        <p className="mt-4 text-gray-700 text-lg max-w-lg drop-shadow-sm">
          Join our community of movie enthusiasts today!
        </p>

        <div className="flex gap-4 mt-8">
          {user?.role === "admin" && (
            <Link
              to="/admin/add"
              className="px-6 py-3 bg-blue-600 text-white rounded-2xl shadow-xl hover:bg-blue-700 transition font-medium backdrop-blur"
            >
              Add a Movie
            </Link>
          )}

          <Link
            to="/"
            className="px-6 py-3 bg-white/70 border rounded-2xl shadow-xl hover:bg-white transition font-medium backdrop-blur"
          >
            Browse
          </Link>
        </div>
      </motion.div>

      {/* SLIDER */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute right-10 top-1/2 -translate-y-1/2 w-[650px] aspect-video overflow-hidden rounded-3xl shadow-2xl group"
        onMouseEnter={() => setPause(true)}
        onMouseLeave={() => setPause(false)}
      >
        

        <AnimatePresence>
          <motion.img
            key={index}
            src={posters[index]}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* BUTTONS */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white text-gray-900 p-3 rounded-full shadow-xl hidden group-hover:flex transition backdrop-blur-md"
        >
          ‹
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white text-gray-900 p-3 rounded-full shadow-xl hidden group-hover:flex transition backdrop-blur-md"
        >
          ›
        </button>

        {/* DOTS */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {posters.map((_, i) => (
            <div
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-200 backdrop-blur-md ${
                i === index
                  ? "bg-white scale-125 shadow-xl"
                  : "bg-white/40 hover:bg-white"
              }`}
            ></div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}