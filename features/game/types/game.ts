export type ResourceKey = "thumbnails" | "likes" | "followers" | "money";

export type UpgradeEffectType =
  | "thumbnail"
  | "thumbnailMultiplier"
  | "autoThumbnail"
  | "likesPerThumbnail"
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
      | "thumbnails"
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
  thumbnails: number;
  likes: number;
  totalLikes: number;
  followers: number;
  money: number;
  totalClicks: number;
  upgradeLevels: Record<string, number>;
  achievements: string[];
  playTimeSeconds: number;
};
