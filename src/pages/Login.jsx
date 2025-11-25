import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// --- 1. DATA GAMBAR ---
const moviePosters = [
  "https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHkjJDveYoW.jpg",
  "https://image.tmdb.org/t/p/w500/6oom5QkC9pSvTlf4QGWve28R6i2.jpg",
  "https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg",
  "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
  "https://image.tmdb.org/t/p/w500/ow3wq89wM8qd5X7hFZkIyckq05_f.jpg",
  "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  "https://image.tmdb.org/t/p/w500/saHP97rTPS5eLmrLQEcANmKrsFl.jpg",
];

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const result = login(username, password);
    if (result.success) {
      navigate("/");
    } else {
      setError(result.message);
    }
  };

  // --- 2. CSS STYLES (Disimpan dalam variabel agar tidak error) ---
  const cssStyles = `
    @keyframes marquee {
      0% { transform: translateX(0%); }
      100% { transform: translateX(-50%); }
    }
    @keyframes marquee-reverse {
      0% { transform: translateX(-50%); }
      100% { transform: translateX(0%); }
    }
    .animate-marquee {
      animation: marquee 40s linear infinite;
    }
    .animate-marquee-reverse {
      animation: marquee-reverse 40s linear infinite;
    }
    @keyframes blob {
      0% { transform: translate(0px, 0px) scale(1); }
      33% { transform: translate(30px, -50px) scale(1.1); }
      66% { transform: translate(-20px, 20px) scale(0.9); }
      100% { transform: translate(0px, 0px) scale(1); }
    }
    .animate-blob {
      animation: blob 7s infinite;
    }
    .animation-delay-2000 {
      animation-delay: 2s;
    }
  `;

  return (
    <div className="relative flex justify-center items-center h-screen w-full overflow-hidden bg-gray-900 text-white font-sans">
      
      {/* --- 3. INJECT CSS DI SINI --- */}
      <style dangerouslySetInnerHTML={{ __html: cssStyles }} />

      {/* --- BACKGROUND ANIMATION --- */}
      <div className="absolute inset-0 z-10 bg-black/60 backdrop-blur-[2px]"></div>
      
      <div className="absolute inset-0 z-0 flex flex-col gap-4 opacity-50 rotate-12 scale-125">
        <div className="flex animate-marquee gap-4">
          {[...moviePosters, ...moviePosters].map((src, index) => (
            <img key={`row1-${index}`} src={src} alt="poster" className="w-48 h-72 object-cover rounded-lg shadow-lg" />
          ))}
        </div>
        <div className="flex animate-marquee-reverse gap-4">
          {[...moviePosters, ...moviePosters].map((src, index) => (
            <img key={`row2-${index}`} src={src} alt="poster" className="w-48 h-72 object-cover rounded-lg shadow-lg" />
          ))}
        </div>
        <div className="flex animate-marquee gap-4">
          {[...moviePosters, ...moviePosters].map((src, index) => (
            <img key={`row3-${index}`} src={src} alt="poster" className="w-48 h-72 object-cover rounded-lg shadow-lg" />
          ))}
        </div>
      </div>

      {/* --- LOGIN CARD --- */}
      <div className="z-20 w-full max-w-md p-8 relative">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>

        <form
          onSubmit={handleLogin}
          className="relative bg-white/10 border border-white/20 backdrop-blur-md p-8 rounded-2xl shadow-2xl"
        >
          <div className="mb-6 text-center">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-300 text-sm">Enter your details to watch movies</p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 text-sm p-3 rounded-lg mb-4 text-center">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Username"
                className="w-full bg-black/30 border border-gray-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-500 transition-all"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                className="w-full bg-black/30 border border-gray-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-500 transition-all"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 rounded-lg shadow-lg transform transition hover:scale-[1.02] active:scale-95"
          >
            Sign In
          </button>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-xs">Demo Credentials:</p>
            <div className="flex justify-center gap-4 mt-2 text-xs text-blue-300 font-mono">
              <span>admin / admin123</span>
              <span>|</span>
              <span>user / user123</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}