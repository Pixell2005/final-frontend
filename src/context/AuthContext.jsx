import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    try {
      const res = await axios.get(
        `http://localhost:3001/users?username=${username}&password=${password}`
      );

      if (res.data.length === 1) {
        const userData = res.data[0]; // { username, password, role }
        setUser(userData);
        return { success: true };
      } else {
        return { success: false, message: "Invalid username or password" };
      }
    } catch (err) {
      return { success: false, message: "Server error" };
    }
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
