export type ResourceKey = "likes" | "followers" | "money";

export type UpgradeEffectType =
  | "likesPerClick"
  | "clickMultiplier"
  | "autoLikes"
  | "likesMultiplier"
  | "followerConversion"
  | "moneyPerFollower"
  | "moneyMultiplier";

export type Upgrade = {
  id: string;
  name: string;
  description: string;
  baseCost: number;
  costMultiplier: number;
  maxLevel?: number;
  effectType: UpgradeEffectType;
  effectValue: number;
  currency: "likes" | "money";
};

export type Achievement = {
  id: string;
  name: string;
  description: string;
  condition: {
    metric:
      | "totalClicks"
      | "totalLikes"
      | "likes"
      | "followers"
      | "money"
      | "likesPerSecond";
    threshold: number;
  };
};

export type Notification = {
  id: string;
  message: string;
};

export type PersistedGameState = {
  likes: number;
  totalLikes: number;
  followers: number;
  money: number;
  totalClicks: number;
  upgradeLevels: Record<string, number>;
  achievements: string[];
  playTimeSeconds: number;
};
