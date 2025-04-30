import React, { createContext, useState, useContext } from "react";
import { router } from "expo-router";

interface AuthContextType {
  authToken: string | null;
  setAuthToken: (token: string) => void;
  logout: () => void;
  fetchUserData: () => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authToken, setAuthToken] = useState<string | null>(null);

  const logout = () => {
    setAuthToken(null);
    setTimeout(() => {
      router.replace("/Login");
    }, 0);
  };

  const fetchUserData = async () => {
    if (!authToken) return;

    try {
      const response = await fetch("https://kelompok5.serverku.org/api/users/me", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + authToken,
        },
      });

      if (response.status === 401) {
        console.log("Token expired or invalid. Logging out...");
        logout();
        throw new Error("Unauthorized");
      }

      const data = await response.json();
      console.log("User data:", data);
      return data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken, logout, fetchUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
