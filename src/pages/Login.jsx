import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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

  const [isSignUp, setIsSignUp] = useState(false);

  const [email, setEmail] = useState("");                 // ➜ TAMBAHAN

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // --- LOGIN ---
  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await login(username, password);

    if (result.success) {
      navigate("/");
    } else {
      setError(result.message);
    }
  };

  // --- SIGN UP ---
  const handleSignUp = async (e) => {
    e.preventDefault();

    // VALIDASI: field wajib ada
    if (!username || !password || !email || !confirmPassword) {
      setError("Semua field wajib diisi.");
      return;
    }

    // VALIDASI: email format benar
    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(email)) {
      setError("Format email tidak valid.");
      return;
    }

    // VALIDASI: password cocok
    if (password !== confirmPassword) {
      setError("Konfirmasi password tidak cocok.");
      return;
    }

    try {
      // Cek apakah username sudah ada
      const check = await axios.get(`http://localhost:3001/users?username=${username}`);
      if (check.data.length > 0) {
        setError("Username sudah digunakan.");
        return;
      }

      // Simpan user baru
      await axios.post("http://localhost:3001/users", {
        username,
        email,        // ➜ TAMBAH EMAIL KE DATABASE
        password,
        role: "user",
      });

      setSuccessMsg("Akun berhasil dibuat! Silakan login.");
      setError("");
      setIsSignUp(false);

    } catch (err) {
      setError("Gagal daftar. Pastikan json-server berjalan.");
    }
  };

  // --- CSS STYLES ---
  const cssStyles = `
    @keyframes marquee {
      0% { transform: translateX(0%); }
      100% { transform: translateX(-50%); }
    }
    @keyframes marquee-reverse {
      0% { transform: translateX(-50%); }
      100% { transform: translateX(0%); }
    }
    .animate-marquee { animation: marquee 40s linear infinite; }
    .animate-marquee-reverse { animation: marquee-reverse 40s linear infinite; }

    @keyframes blob {
      0% { transform: translate(0px, 0px) scale(1); }
      33% { transform: translate(30px, -50px) scale(1.1); }
      66% { transform: translate(-20px, 20px) scale(0.9); }
      100% { transform: translate(0px, 0px) scale(1); }
    }
    .animate-blob { animation: blob 7s infinite; }
    .animation-delay-2000 { animation-delay: 2s; }
  `;

  return (
    <div className="relative flex justify-center items-center h-screen w-full overflow-hidden bg-gray-900 text-white font-sans">

      <style dangerouslySetInnerHTML={{ __html: cssStyles }} />

      {/* Background Animation */}
      <div className="absolute inset-0 z-10 bg-black/60 backdrop-blur-[2px]"></div>

      <div className="absolute inset-0 z-0 flex flex-col gap-4 opacity-50 rotate-12 scale-125">
        {[1, 2, 3].map((row) => (
          <div key={row} className={`flex gap-4 ${row % 2 ? "animate-marquee" : "animate-marquee-reverse"}`}>
            {[...moviePosters, ...moviePosters].map((src, index) => (
              <img
                key={`${row}-${index}`}
                src={src}
                alt="poster"
                className="w-48 h-72 object-cover rounded-lg shadow-lg"
              />
            ))}
          </div>
        ))}
      </div>

      {/* --- LOGIN / SIGN UP CARD --- */}
      <div className="z-20 w-full max-w-md p-8 relative">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>

        <form
          onSubmit={isSignUp ? handleSignUp : handleLogin}
          className="relative bg-white/10 border border-white/20 backdrop-blur-md p-8 rounded-2xl shadow-2xl"
        >
          <div className="mb-6 text-center">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </h1>
            <p className="text-gray-300 text-sm">
              {isSignUp ? "Daftar untuk mulai menonton film" : "Masukkan data akun untuk login"}
            </p>
          </div>

          {/* Error & Success */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 text-sm p-3 rounded-lg mb-4 text-center">
              {error}
            </div>
          )}

          {successMsg && (
            <div className="bg-green-500/20 border border-green-500/50 text-green-200 text-sm p-3 rounded-lg mb-4 text-center">
              {successMsg}
            </div>
          )}

          <div className="space-y-4">
            
            {/* EMAIL (Sign Up Only) */}
            {isSignUp && (
              <>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-black/30 border border-gray-600 text-white px-4 py-3 rounded-lg focus:outline-none"
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full bg-black/30 border border-gray-600 text-white px-4 py-3 rounded-lg focus:outline-none"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </>
            )}

            {/* USERNAME */}
            <input
              type="text"
              placeholder="Username"
              className="w-full bg-black/30 border border-gray-600 text-white px-4 py-3 rounded-lg focus:outline-none"
              onChange={(e) => setUsername(e.target.value)}
            />

            {/* PASSWORD */}
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-black/30 border border-gray-600 text-white px-4 py-3 rounded-lg focus:outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 rounded-lg shadow-lg"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>

          {/* Switch */}
          <p className="text-center text-gray-300 text-sm mt-4">
            {isSignUp ? "Sudah punya akun?" : "Belum punya akun?"}{" "}
            <span
              className="text-blue-400 hover:underline cursor-pointer"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError("");
                setSuccessMsg("");
              }}
            >
              {isSignUp ? "Login" : "Daftar"}
            </span>
          </p>

          {!isSignUp && (
            <div className="mt-6 text-center">
              <p className="text-gray-400 text-xs">Demo Credentials:</p>
              <div className="flex justify-center gap-4 mt-2 text-xs text-blue-300 font-mono">
                <span>admin / admin123</span>
                <span>|</span>
                <span>user / user123</span>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
