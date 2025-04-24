import React, { createContext, useState, useContext } from 'react';

interface AuthContextType {
  authToken: any;
  setAuthToken: (token: string ) => void;
  logout: () => void;
  
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authToken, setAuthToken] = useState<string | null>(null);

  const logout = () => {
    setAuthToken(null);
  };

  console.log("AuthToken nya :", authToken);
  
  

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken, logout }}>
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
