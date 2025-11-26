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
    <section className="relative overflow-hidden px-10 py-24 bg-[#0a0f24]">
      
      {/* 🔥 GRADIENT GLOW SENADA HOME */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-15%] w-[480px] h-[480px] 
            bg-blue-700 opacity-25 blur-[150px] rounded-full"></div>

        <div className="absolute bottom-[-20%] right-[-10%] w-[520px] h-[520px] 
            bg-purple-600 opacity-20 blur-[170px] rounded-full"></div>
      </div>

      {/* TEXT */}
      <motion.div
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl relative z-10"
      >
        <h1 className="text-6xl font-extrabold text-white leading-tight drop-shadow-lg">
          Discover movies.
          <br /> Write reviews.
          <br /> Share feelings.
        </h1>

        <p className="mt-4 text-gray-300 text-lg max-w-lg drop-shadow">
          Join our community of movie enthusiasts today!
        </p>

        <div className="flex gap-4 mt-8">
          {user?.role === "admin" && (
            <Link
              to="/admin/add"
              className="px-6 py-3 bg-blue-600 text-white rounded-2xl shadow-lg hover:bg-blue-700 transition font-medium"
            >
              Add a Movie
            </Link>
          )}

          <Link
            to="/"
            className="px-6 py-3 bg-white/10 border border-white/20 text-white rounded-2xl shadow-lg hover:bg-white/20 transition font-medium backdrop-blur"
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
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/40 hover:bg-white text-gray-900 p-3 rounded-full shadow-xl hidden group-hover:flex transition backdrop-blur-md"
        >
          ‹
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/40 hover:bg-white text-gray-900 p-3 rounded-full shadow-xl hidden group-hover:flex transition backdrop-blur-md"
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
