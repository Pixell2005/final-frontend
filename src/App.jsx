import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MovieDetail from "./pages/MovieDetail";
import AddEditMovie from "./pages/AddEditMovie";

import AdminRoute from "./components/AdminRoute";

import { ThemeProvider } from "./context/ThemeContext";
// ... yang lain tetap

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Navbar />
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
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}