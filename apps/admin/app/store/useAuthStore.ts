import { User } from "@repo/types/src/user";
import { create } from "zustand";
export interface AuthState {
  user: User | null;
}

export interface AuthAction {
  setUser: (user: User) => void;
}

export const useStore = create<AuthState & AuthAction>((set) => ({
  user: null,
  setUser: (user: User) => {
    set({ user: user });
  },
}));
