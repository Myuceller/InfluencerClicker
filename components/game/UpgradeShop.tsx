"use client";

import { Card } from "@/components/common/Card";
import { upgrades } from "@/features/game/data/upgrades";
import { useGameStore } from "@/features/game/store/useGameStore";
import {
  isUpgradeRevealed,
  isUpgradeVisible,
} from "@/features/game/utils/upgradeUnlocks";
import { UpgradeItem } from "./UpgradeItem";

export function UpgradeShop() {
  const upgradeLevels = useGameStore((state) => state.upgradeLevels);
  const visibleUpgrades = upgrades
    .map((upgrade, index) => ({ upgrade, index }))
    .filter(({ index }) => isUpgradeVisible(index, upgradeLevels));

  return (
    <Card className="p-2.5 sm:p-3">
      <div className="mb-3">
        <p className="text-xs font-semibold uppercase text-white/60">
          성장 장치
        </p>
        <h2 className="text-lg font-bold">좋아요 성능 업그레이드</h2>
      </div>
      <div className="grid gap-2 lg:max-h-[calc(100vh-15rem)] lg:overflow-y-auto lg:pr-1">
        {visibleUpgrades.map(({ upgrade, index }) => (
          <UpgradeItem
            key={upgrade.id}
            upgrade={upgrade}
            locked={!isUpgradeRevealed(index, upgradeLevels)}
          />
        ))}
      </div>
    </Card>
  );
}
