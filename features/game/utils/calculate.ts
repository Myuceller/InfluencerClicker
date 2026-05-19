import { upgrades } from "../data/upgrades";

export function calculateUpgradeCost(
  baseCost: number,
  level: number,
  multiplier: number,
) {
  return Math.floor(baseCost * multiplier ** level);
}

export function calculateDerivedStats(upgradeLevels: Record<string, number>) {
  return upgrades.reduce(
    (totals, upgrade) => {
      const level = upgradeLevels[upgrade.id] ?? 0;
      const bonus = level * upgrade.effectValue;

      if (upgrade.effectType === "likesPerClick") {
        totals.likesPerClick += bonus;
      }

      if (upgrade.effectType === "clickMultiplier") {
        totals.clickMultiplier += bonus;
      }

      if (upgrade.effectType === "autoLikes") {
        totals.autoLikesPerSecond += bonus;
      }

      if (upgrade.effectType === "likesMultiplier") {
        totals.likesMultiplier += bonus;
      }

      if (upgrade.effectType === "followerConversion") {
        totals.likesPerFollower = Math.max(20, totals.likesPerFollower - bonus);
      }

      if (upgrade.effectType === "moneyPerFollower") {
        totals.moneyPerFollower += bonus;
      }

      if (upgrade.effectType === "moneyMultiplier") {
        totals.moneyMultiplier += bonus;
      }

      return totals;
    },
    {
      likesPerClick: 1,
      clickMultiplier: 1,
      autoLikesPerSecond: 0,
      likesMultiplier: 1,
      likesPerFollower: 100,
      moneyPerFollower: 0,
      moneyMultiplier: 1,
    },
  );
}
