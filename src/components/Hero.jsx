import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlay } from "react-icons/fi";

export default function Hero() {
  const [slides, setSlides] = useState([]);
  const [index, setIndex] = useState(0);
  const [pause, setPause] = useState(false);

  // GET MOVIES + HERO IMAGES
  useEffect(() => {
    const fetchData = async () => {
      const moviesRes = await fetch("http://localhost:3001/movies");
      const heroRes = await fetch("http://localhost:3001/hero");

      const movies = await moviesRes.json();
      const heroImages = await heroRes.json();

      // Gabungkan heroImages + movie data
      const fullSlides = heroImages
        .map((hero) => {
          const movie = movies.find((m) => m.id === hero.movieId);
          if (!movie) return null;
          return { ...movie, heroImage: hero.image };
        })
        .filter(Boolean); // buang null

      setSlides(fullSlides);
    };

    fetchData();
  }, []);

  // AUTOPLAY
  useEffect(() => {
    if (pause || slides.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [pause, slides]);

  if (slides.length === 0)
    return <div className="h-[60vh] bg-black"></div>;

  const movie = slides[index];

  return (
    <section className="relative w-full h-[75vh] overflow-hidden bg-black">

      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0"
        onMouseEnter={() => setPause(true)}
        onMouseLeave={() => setPause(false)}
      >
        <AnimatePresence>
          <motion.img
            key={movie.id}
            src={movie.heroImage}
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        </AnimatePresence>

        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/10 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-l from-black via-black/10 to-transparent"></div>
        <div className="absolute bottom-0 inset-x-0 h-[40%] bg-gradient-to-t from-black to-transparent"></div>
      </div>

      {/* TEXT */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute bottom-20 left-16 z-10 max-w-xl"
      >
        <h1 className="text-5xl font-extrabold text-white drop-shadow-xl">
          {movie.title}
        </h1>

        <p className="text-gray-300 mt-3 max-w-md text-lg line-clamp-2">
          {movie.summary}
        </p>

        <div className="flex gap-4 mt-6">
          <Link
            to={`/movies/${movie.id}`}
            className="px-6 py-3 bg-white text-black rounded-lg font-semibold shadow-lg flex items-center gap-2 hover:bg-gray-200"
          >
            <FiPlay /> Rate
          </Link>

          <Link
            to={`/movies/${movie.id}`}
            className="px-6 py-3 bg-white/20 border border-white/30 text-white rounded-lg backdrop-blur hover:bg-white/30"
          >
            More Info
          </Link>
        </div>
      </motion.div>

    </section>
  );
}
