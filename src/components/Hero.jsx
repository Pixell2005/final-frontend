import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Hero() {
  const { user } = useAuth();

  return (
    <section className="px-10 py-20 bg-gradient-to-r from-gray-200 to-gray-300 relative">
      <div className="max-w-4xl">
        <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
          Discover movies. Write reviews. Share feelings.
        </h1>

        <p className="mt-4 text-gray-700 text-lg">
          A minimalist cinematic review app inspired by Letterboxd — modern UI,
          smooth animations, and simple CRUD.
        </p>

        <div className="flex gap-4 mt-8">
          {/* ADMIN ONLY */}
          {user?.role === "admin" && (
            <Link
              to="/admin/add"
              className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
            >
              Add a Movie
            </Link>
          )}

          <Link
            to="/"
            className="px-6 py-3 bg-white border rounded-xl shadow hover:bg-gray-100 transition"
          >
            Browse
          </Link>
        </div>
      </div>

      <img
        src="/assets/hero.jpg"
        alt="hero"
        className="absolute right-20 top-10 w-[450px] rounded-2xl shadow-lg opacity-60"
      />
    </section>
  );
}
