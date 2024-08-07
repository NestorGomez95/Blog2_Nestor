"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import authService from '../services/AuthService';

type AuthContextType = {
  isAdmin: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const { isAdmin, isAuthenticated } = authService.getAuthStatus();
    setIsAdmin(isAdmin);
    setIsAuthenticated(isAuthenticated);
  }, []);

  const login = async (username: string, password: string) => {
    await authService.login(username, password);
    const { isAdmin, isAuthenticated } = authService.getAuthStatus();
    setIsAdmin(isAdmin);
    setIsAuthenticated(isAuthenticated);
  };

  const logout = () => {
    authService.logout();
    setIsAdmin(false);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAdmin, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
