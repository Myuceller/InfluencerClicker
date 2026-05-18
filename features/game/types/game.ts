export type ResourceKey = "likes" | "followers" | "dopamine" | "clout";

export type UpgradeEffectType = "click" | "passive";

export type Upgrade = {
  id: string;
  name: string;
  description: string;
  baseCost: number;
  costMultiplier: number;
  effectType: UpgradeEffectType;
  effectValue: number;
};

export type Achievement = {
  id: string;
  name: string;
  description: string;
  condition: {
    metric: "totalClicks" | "likes" | "followers" | "likesPerSecond";
    threshold: number;
  };
};

export type Notification = {
  id: string;
  message: string;
};

export type PersistedGameState = {
  likes: number;
  followers: number;
  dopamine: number;
  clout: number;
  totalClicks: number;
  upgradeLevels: Record<string, number>;
  achievements: string[];
  playTimeSeconds: number;
};
