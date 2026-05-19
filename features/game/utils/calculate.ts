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

      if (upgrade.effectType === "thumbnail") {
        totals.thumbnailsPerClick += bonus;
      }

      if (upgrade.effectType === "thumbnailMultiplier") {
        totals.thumbnailMultiplier += bonus;
      }

      if (upgrade.effectType === "autoThumbnail") {
        totals.thumbnailsPerSecond += bonus;
      }

      if (upgrade.effectType === "likesPerThumbnail") {
        totals.likesPerThumbnail += bonus;
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
      thumbnailsPerClick: 1,
      thumbnailMultiplier: 1,
      thumbnailsPerSecond: 0,
      likesPerThumbnail: 0.1,
      likesMultiplier: 1,
      likesPerFollower: 100,
      moneyPerFollower: 0,
      moneyMultiplier: 1,
    },
  );
}
