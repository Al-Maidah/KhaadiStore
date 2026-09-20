import React, { createContext, useContext, useMemo, useState } from 'react';
import { api } from '../../api/client';

const AuthContext = createContext();
const STORAGE_KEY = 'store_user';

function readStoredUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUserState] = useState(readStoredUser);

  const setUser = (next) => {
    setUserState(next);
    if (next) localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    else localStorage.removeItem(STORAGE_KEY);
  };

  const register = async (payload) => {
    const created = await api.register(payload);
    setUser(created);
    return created;
  };

  const login = async (payload) => {
    const found = await api.login(payload);
    setUser(found);
    return found;
  };

  const logout = () => setUser(null);

  const refreshUser = async () => {
    if (!user?.id) return null;
    const latest = await api.getUser(user.id);
    setUser(latest);
    return latest;
  };

  const updateProfile = async (body) => {
    if (!user?.id) throw new Error('Not signed in');
    const updated = await api.updateUser(user.id, body);
    setUser({ ...user, ...updated });
    return updated;
  };

  const value = useMemo(
    () => ({ user, setUser, register, login, logout, refreshUser, updateProfile }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
