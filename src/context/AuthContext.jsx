import { createContext, useContext, useState } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // user = { username: "admin", role: "admin" }

  const login = (username, password) => {
    // Dummy auth — bisa diganti API kalau mau
    if (username === "admin" && password === "admin123") {
      const data = { username, role: "admin" };
      setUser(data);
      return { success: true };
    }
    if (username === "user" && password === "user123") {
      const data = { username, role: "user" };
      setUser(data);
      return { success: true };
    }
    return { success: false, message: "Invalid username or password" };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
