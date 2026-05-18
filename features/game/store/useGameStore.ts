"use client";

import { create } from "zustand";
import { achievements } from "../data/achievements";
import { randomNotifications } from "../data/randomEvents";
import { upgrades } from "../data/upgrades";
import type { Notification, PersistedGameState } from "../types/game";
import {
  calculateDerivedStats,
  calculateUpgradeCost,
} from "../utils/calculate";
import { loadCloudGameState, saveCloudGameState } from "../utils/cloudStorage";
import { loadGameState, saveGameState } from "../utils/storage";

type GameState = PersistedGameState & {
  hydrated: boolean;
  likesPerClick: number;
  likesPerSecond: number;
  notifications: Notification[];
  hydrate: () => void;
  clickReel: () => void;
  buyUpgrade: (upgradeId: string) => void;
  tick: () => void;
  mergeCloudState: () => Promise<void>;
  syncCloudState: () => Promise<void>;
};

const initialPersistedState: PersistedGameState = {
  likes: 0,
  followers: 0,
  dopamine: 0,
  clout: 0,
  totalClicks: 0,
  upgradeLevels: {},
  achievements: [],
  playTimeSeconds: 0,
};

function getUnlockedAchievements(state: GameState) {
  return achievements
    .filter((achievement) => state[achievement.condition.metric] >= achievement.condition.threshold)
    .map((achievement) => achievement.id);
}

function toPersistedState(state: GameState): PersistedGameState {
  return {
    likes: state.likes,
    followers: state.followers,
    dopamine: state.dopamine,
    clout: state.clout,
    totalClicks: state.totalClicks,
    upgradeLevels: state.upgradeLevels,
    achievements: state.achievements,
    playTimeSeconds: state.playTimeSeconds,
  };
}

function makeNotification(message: string): Notification {
  return {
    id: crypto.randomUUID(),
    message,
  };
}

export const useGameStore = create<GameState>((set, get) => ({
  ...initialPersistedState,
  ...calculateDerivedStats(initialPersistedState.upgradeLevels),
  hydrated: false,
  notifications: [
    makeNotification("돌아오셨군요, 크리에이터님. 시청자는 오늘도 세로 영상을 원합니다."),
  ],
  hydrate: () => {
    const saved = loadGameState();
    const merged = { ...initialPersistedState, ...saved };
    const derived = calculateDerivedStats(merged.upgradeLevels);

    set({
      ...merged,
      ...derived,
      hydrated: true,
    });
  },
  clickReel: () => {
    set((state) => {
      const nextLikes = state.likes + state.likesPerClick;
      const nextState = {
        ...state,
        likes: nextLikes,
        followers: state.followers + Math.max(1, Math.floor(state.likesPerClick / 2)),
        dopamine: state.dopamine + 1,
        clout: state.clout + Math.max(1, Math.floor(state.likesPerClick / 3)),
        totalClicks: state.totalClicks + 1,
      };
      nextState.achievements = getUnlockedAchievements(nextState);

      return nextState;
    });
  },
  buyUpgrade: (upgradeId) => {
    const upgrade = upgrades.find((item) => item.id === upgradeId);

    if (!upgrade) {
      return;
    }

    set((state) => {
      const currentLevel = state.upgradeLevels[upgradeId] ?? 0;
      const cost = calculateUpgradeCost(
        upgrade.baseCost,
        currentLevel,
        upgrade.costMultiplier,
      );

      if (state.likes < cost) {
        return state;
      }

      const upgradeLevels = {
        ...state.upgradeLevels,
        [upgradeId]: currentLevel + 1,
      };
      const derived = calculateDerivedStats(upgradeLevels);
      const nextState = {
        ...state,
        likes: state.likes - cost,
        upgradeLevels,
        ...derived,
      };
      nextState.achievements = getUnlockedAchievements(nextState);

      return nextState;
    });
  },
  tick: () => {
    set((state) => {
      const shouldNotify = Math.random() > 0.7;
      const nextState = {
        ...state,
        likes: state.likes + state.likesPerSecond,
        followers: state.followers + Math.floor(state.likesPerSecond / 2),
        dopamine: state.dopamine + (state.likesPerSecond > 0 ? 1 : 0),
        clout: state.clout + Math.floor(state.likesPerSecond / 3),
        playTimeSeconds: state.playTimeSeconds + 1,
        notifications: shouldNotify
          ? [
              makeNotification(
                randomNotifications[
                  Math.floor(Math.random() * randomNotifications.length)
                ],
              ),
              ...state.notifications,
            ].slice(0, 4)
          : state.notifications,
      };
      nextState.achievements = getUnlockedAchievements(nextState);

      return nextState;
    });
  },
  mergeCloudState: async () => {
    const cloudState = await loadCloudGameState();

    if (!cloudState) {
      return;
    }

    set((state) => {
      const shouldUseCloud = cloudState.playTimeSeconds > state.playTimeSeconds;

      if (!shouldUseCloud) {
        return state;
      }

      return {
        ...state,
        ...cloudState,
        ...calculateDerivedStats(cloudState.upgradeLevels),
      };
    });
  },
  syncCloudState: async () => {
    await saveCloudGameState(toPersistedState(get()));
  },
}));

let intervalId: ReturnType<typeof setInterval> | null = null;
let unsubscribe: (() => void) | null = null;

export function initializeGame() {
  if (typeof window === "undefined") {
    return;
  }

  useGameStore.getState().hydrate();

  if (!intervalId) {
    intervalId = setInterval(() => {
      const state = useGameStore.getState();
      state.tick();
      saveGameState(toPersistedState(useGameStore.getState()));
    }, 1000);
  }

  if (!unsubscribe) {
    unsubscribe = useGameStore.subscribe((state) => {
      if (state.hydrated) {
        saveGameState(toPersistedState(state));
      }
    });
  }
}
