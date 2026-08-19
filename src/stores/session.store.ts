import type { Session } from "@/types/session.type";
import { create } from "zustand";

type SessionStoreType = {
  session: Session | null;
  isLoading: boolean;
  setSession: (newSession: Session | null) => void;
  setIsLoading: (newState: boolean) => void;
};

export const useSessionStore = create<SessionStoreType>((set) => ({
  session: null,
  isLoading: true,
  setSession: (newSession) => set({ session: newSession }),
  setIsLoading: (newState) => set({ isLoading: newState }),
}));
