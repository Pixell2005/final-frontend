// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import MovieDetail from "./pages/MovieDetail";
import AddEditMovie from "./pages/AddEditMovie";
import WatchList from "./pages/WatchList";
import Profile from "./pages/Profile";

import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <div className="flex flex-col min-h-screen overflow-x-hidden">
            <Navbar />

            {/* MAIN CONTENT */}
            <main className="flex-1">
              <Routes>
                {/* Public */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/movies/:id" element={<MovieDetail />} />

                {/* User Protected */}
                <Route
                  path="/watchlist"
                  element={
                    <ProtectedRoute>
                      <WatchList />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />

                {/* Admin */}
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

            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}
