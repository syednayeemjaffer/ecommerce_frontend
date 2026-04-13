import { create } from "zustand";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  user_image?: string;
};

type AuthState = {
  accessToken: string | null;
  user: User | null;
  setAccessToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,

  setAccessToken: (token) => set({ accessToken: token }),
  setUser: (user) => set({ user }),

  clearAuth: () =>
    set({
      accessToken: null,
      user: null,
    }),
}));