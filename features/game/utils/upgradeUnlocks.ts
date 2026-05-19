import { upgrades } from "../data/upgrades";

export const LOCKED_UPGRADE_PREVIEW_COUNT = 3;

export function getHighestPurchasedUpgradeIndex(
  upgradeLevels: Record<string, number>,
) {
  return upgrades.reduce((highestIndex, upgrade, index) => {
    return (upgradeLevels[upgrade.id] ?? 0) > 0 ? index : highestIndex;
  }, -1);
}

export function isUpgradeVisible(
  upgradeIndex: number,
  upgradeLevels: Record<string, number>,
) {
  const highestPurchasedIndex = getHighestPurchasedUpgradeIndex(upgradeLevels);

  return upgradeIndex <= highestPurchasedIndex + LOCKED_UPGRADE_PREVIEW_COUNT + 1;
}

export function isUpgradeRevealed(
  upgradeIndex: number,
  upgradeLevels: Record<string, number>,
) {
  if (upgradeIndex === 0) {
    return true;
  }

  const previousUpgrade = upgrades[upgradeIndex - 1];

  return previousUpgrade ? (upgradeLevels[previousUpgrade.id] ?? 0) > 0 : false;
}
