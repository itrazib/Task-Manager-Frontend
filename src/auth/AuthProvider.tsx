import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { api } from "../api/axios";
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
  };

  useEffect(() => {
    api
      .get("/auth/me")
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);
  const authInfo = {
    user,
    setUser,
    logout,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};
