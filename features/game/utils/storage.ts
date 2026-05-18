import type { PersistedGameState } from "../types/game";
import { STORAGE_KEY } from "@/lib/constants";

export function loadGameState(): PersistedGameState | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as PersistedGameState;
  } catch {
    return null;
  }
}

export function saveGameState(state: PersistedGameState) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
