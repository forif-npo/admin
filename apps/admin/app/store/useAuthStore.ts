/* eslint-disable no-unused-vars */
import { User } from "@repo/types/src/user";
import { create } from "zustand";
export interface AuthState {
  user: User | null;
}

export interface AuthAction {
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState & AuthAction>((set) => ({
  user: null,
  accessToken: null,
  setUser: (user: User | null) => {
    set({ user: user });
  },
}));
