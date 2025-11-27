import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MovieDetail from "./pages/MovieDetail";
import AddEditMovie from "./pages/AddEditMovie";

import AdminRoute from "./components/AdminRoute";

import { ThemeProvider } from "./context/ThemeContext";
import Footer from "./components/Footer";

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          {/* Flex container full screen */}
          <div className="flex flex-col min-h-screen overlow-x-hidden">
            <Navbar />

            {/* Konten halaman */}
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movies/:id" element={<MovieDetail />} />
                <Route path="/login" element={<Login />} />

                <Route
                  path="/admin/add"
                  element={
                    <AdminRoute>
                      <AddEditMovie />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/edit/:id"
                  element={
                    <AdminRoute>
                      <AddEditMovie />
                    </AdminRoute>
                  }
                />
              </Routes>
            </main>

            {/* Footer */}
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}
