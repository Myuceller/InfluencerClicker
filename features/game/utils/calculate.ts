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

      if (upgrade.effectType === "click") {
        totals.likesPerClick += bonus;
      } else {
        totals.likesPerSecond += bonus;
      }

      return totals;
    },
    { likesPerClick: 1, likesPerSecond: 0 },
  );
}
