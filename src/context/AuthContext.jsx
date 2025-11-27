import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Auto-login from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("auth-user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const saveUser = (data) => {
    setUser(data);
    localStorage.setItem("auth-user", JSON.stringify(data));
  };

  // LOGIN
  const login = async (username, password) => {
    try {
      const res = await axios.get(
        `http://localhost:3001/users?username=${username}&password=${password}`
      );

      if (res.data.length === 1) {
        saveUser(res.data[0]);
        return { success: true };
      } else {
        return { success: false, message: "Invalid username or password" };
      }
    } catch {
      return { success: false, message: "Server error" };
    }
  };

  // LOGOUT
  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth-user");
  };

  // UPDATE USER (username / email / avatar)
  const updateUser = async (updates) => {
    if (!user) return;

    const updated = { ...user, ...updates };

    await axios.put(`http://localhost:3001/users/${user.id}`, updated);
    saveUser(updated);

    return updated;
  };

  // CHANGE PASSWORD
  const changePassword = async (oldPass, newPass) => {
    if (!user) return { success: false };

    if (user.password !== oldPass)
      return { success: false, message: "Wrong current password" };

    const updated = { ...user, password: newPass };

    await axios.put(`http://localhost:3001/users/${user.id}`, updated);
    saveUser(updated);

    return { success: true };
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, updateUser, changePassword }}
    >
      {children}
    </AuthContext.Provider>
  );
}
