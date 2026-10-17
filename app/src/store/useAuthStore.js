import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,
      setAuth: (token, user) => set({ token, user }),
      updateUser: (updatedUser) => set((state) => ({ user: { ...state.user, ...updatedUser } })),
      logout: () => set({ token: null, user: null }),
    }),
    {
      name: 'sociality-auth-storage',
    }
  )
);