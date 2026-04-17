import { createContext, useContext, useMemo, useState } from 'react';
import { api } from '../api/client';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('quakeguard_user');
    return raw ? JSON.parse(raw) : null;
  });

  const saveSession = (payload) => {
    localStorage.setItem('quakeguard_token', payload.token);
    localStorage.setItem('quakeguard_user', JSON.stringify(payload.user));
    setUser(payload.user);
  };

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    saveSession(response.data);
  };

  const signup = async (name, email, password) => {
    const response = await api.post('/auth/signup', { name, email, password });
    saveSession(response.data);
  };

  const logout = () => {
    localStorage.removeItem('quakeguard_token');
    localStorage.removeItem('quakeguard_user');
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, login, signup, logout, setUser }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
};
