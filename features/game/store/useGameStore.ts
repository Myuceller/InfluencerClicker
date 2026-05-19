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
  thumbnailsPerClick: number;
  thumbnailMultiplier: number;
  thumbnailsPerSecond: number;
  likesPerThumbnail: number;
  likesMultiplier: number;
  likesPerSecond: number;
  likesPerFollower: number;
  moneyPerFollower: number;
  moneyMultiplier: number;
  moneyPerSecond: number;
  notifications: Notification[];
  hydrate: () => void;
  createThumbnail: () => void;
  buyUpgrade: (upgradeId: string) => void;
  tick: (deltaSeconds: number, shouldCheckNotification?: boolean) => void;
  mergeCloudState: () => Promise<void>;
  syncCloudState: () => Promise<void>;
};

const initialPersistedState: PersistedGameState = {
  thumbnails: 0,
  likes: 0,
  totalLikes: 0,
  followers: 0,
  money: 0,
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
    thumbnails: state.thumbnails,
    likes: state.likes,
    totalLikes: state.totalLikes,
    followers: state.followers,
    money: state.money,
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

function getComputedState(
  state: PersistedGameState,
  derived: ReturnType<typeof calculateDerivedStats>,
) {
  const followers = Math.floor(state.totalLikes / derived.likesPerFollower);

  return {
    ...derived,
    followers,
    thumbnailsPerClick:
      derived.thumbnailsPerClick * derived.thumbnailMultiplier,
    likesPerSecond:
      state.thumbnails * derived.likesPerThumbnail * derived.likesMultiplier,
    moneyPerSecond:
      followers * derived.moneyPerFollower * derived.moneyMultiplier,
  };
}

export const useGameStore = create<GameState>((set, get) => ({
  ...initialPersistedState,
  ...getComputedState(
    initialPersistedState,
    calculateDerivedStats(initialPersistedState.upgradeLevels),
  ),
  hydrated: false,
  notifications: [
    makeNotification("돌아오셨군요, 크리에이터님. 오늘은 썸네일이 콘텐츠보다 중요합니다."),
  ],
  hydrate: () => {
    const saved = loadGameState();
    const merged = {
      ...initialPersistedState,
      ...saved,
      totalLikes: saved?.totalLikes ?? saved?.likes ?? 0,
    };
    const derived = calculateDerivedStats(merged.upgradeLevels);

    set({
      ...merged,
      ...getComputedState(merged, derived),
      hydrated: true,
    });
  },
  createThumbnail: () => {
    set((state) => {
      const nextState = {
        ...state,
        thumbnails: state.thumbnails + state.thumbnailsPerClick,
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

      if (upgrade.currency === "likes" && state.likes < cost) {
        return state;
      }

      if (upgrade.currency === "money" && state.money < cost) {
        return state;
      }

      const upgradeLevels = {
        ...state.upgradeLevels,
        [upgradeId]: currentLevel + 1,
      };
      const derived = calculateDerivedStats(upgradeLevels);
      const persistedNextState = {
        ...state,
        likes: upgrade.currency === "likes" ? state.likes - cost : state.likes,
        money: upgrade.currency === "money" ? state.money - cost : state.money,
        upgradeLevels,
      };
      const nextState = {
        ...persistedNextState,
        ...getComputedState(persistedNextState, derived),
      };
      nextState.achievements = getUnlockedAchievements(nextState);

      return nextState;
    });
  },
  tick: (deltaSeconds, shouldCheckNotification = false) => {
    set((state) => {
      const safeDeltaSeconds = Math.min(Math.max(deltaSeconds, 0), 1);
      const shouldNotify = shouldCheckNotification && Math.random() > 0.7;
      const thumbnails =
        state.thumbnails + state.thumbnailsPerSecond * safeDeltaSeconds;
      const likesGained =
        thumbnails *
        state.likesPerThumbnail *
        state.likesMultiplier *
        safeDeltaSeconds;
      const totalLikes = state.totalLikes + likesGained;
      const followers = Math.floor(totalLikes / state.likesPerFollower);
      const moneyPerSecond =
        followers * state.moneyPerFollower * state.moneyMultiplier;
      const nextState = {
        ...state,
        thumbnails,
        likes: state.likes + likesGained,
        totalLikes,
        followers,
        money: state.money + moneyPerSecond * safeDeltaSeconds,
        likesPerSecond:
          thumbnails * state.likesPerThumbnail * state.likesMultiplier,
        moneyPerSecond,
        playTimeSeconds: state.playTimeSeconds + safeDeltaSeconds,
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
        ...getComputedState(
          cloudState,
          calculateDerivedStats(cloudState.upgradeLevels),
        ),
      };
    });
  },
  syncCloudState: async () => {
    await saveCloudGameState(toPersistedState(get()));
  },
}));

let intervalId: ReturnType<typeof setInterval> | null = null;
let saveIntervalId: ReturnType<typeof setInterval> | null = null;
let notificationElapsedSeconds = 0;

export function initializeGame() {
  if (typeof window === "undefined") {
    return;
  }

  useGameStore.getState().hydrate();

  if (!intervalId) {
    let lastTickAt = Date.now();

    intervalId = setInterval(() => {
      const state = useGameStore.getState();
      const now = Date.now();
      const deltaSeconds = (now - lastTickAt) / 1000;
      lastTickAt = now;
      notificationElapsedSeconds += deltaSeconds;
      const shouldCheckNotification = notificationElapsedSeconds >= 5;

      if (shouldCheckNotification) {
        notificationElapsedSeconds = 0;
      }

      state.tick(deltaSeconds, shouldCheckNotification);
    }, 100);
  }

  if (!saveIntervalId) {
    saveIntervalId = setInterval(() => {
      const state = useGameStore.getState();

      if (state.hydrated) {
        saveGameState(toPersistedState(state));
      }
    }, 2000);
  }
}
