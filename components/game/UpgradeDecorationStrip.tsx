"use client";

import { Card } from "@/components/common/Card";
import { upgrades } from "@/features/game/data/upgrades";
import { useGameStore } from "@/features/game/store/useGameStore";
import { UpgradePixelArt } from "./UpgradePixelArt";

export function UpgradeDecorationStrip() {
  const upgradeLevels = useGameStore((state) => state.upgradeLevels);
  const ownedUpgrades = upgrades.filter(
    (upgrade) => (upgradeLevels[upgrade.id] ?? 0) > 0,
  );

  return (
    <Card className="p-3 sm:p-4">
      <div className="mb-3 flex items-center justify-between gap-3 text-xs font-semibold text-white/65">
        <span>콘텐츠에 붙은 장식</span>
        <span>{ownedUpgrades.length}개 활성화</span>
      </div>
      <div className="overflow-x-auto pb-1">
        <div className="flex min-h-20 w-max gap-2 pr-2">
          {ownedUpgrades.length === 0 ? (
            <p className="w-64 self-center text-sm text-white/45">
              업그레이드를 사면 도트 장식이 하나씩 붙습니다.
            </p>
          ) : (
            ownedUpgrades.map((upgrade) => (
              <div
                key={upgrade.id}
                className="grid min-w-14 place-items-center rounded-lg border border-white/10 bg-white/5 p-2"
                title={upgrade.name}
              >
                <UpgradePixelArt
                  upgradeId={upgrade.id}
                  level={upgradeLevels[upgrade.id] ?? 0}
                  compact
                />
              </div>
            ))
          )}
        </div>
      </div>
    </Card>
  );
}
