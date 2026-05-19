"use client";

import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/common/Button";
import type { Upgrade } from "@/features/game/types/game";
import { calculateUpgradeCost } from "@/features/game/utils/calculate";
import { formatNumber } from "@/features/game/utils/formatNumber";
import { useGameStore } from "@/features/game/store/useGameStore";

export function UpgradeItem({ upgrade }: { upgrade: Upgrade }) {
  const likes = useGameStore((state) => state.likes);
  const money = useGameStore((state) => state.money);
  const level = useGameStore((state) => state.upgradeLevels[upgrade.id] ?? 0);
  const buyUpgrade = useGameStore((state) => state.buyUpgrade);
  const cost = calculateUpgradeCost(upgrade.baseCost, level, upgrade.costMultiplier);
  const balance = upgrade.currency === "likes" ? likes : money;
  const effectLabel = {
    thumbnail: "클릭당 썸네일",
    likesPerThumbnail: "썸네일당 좋아요",
    followerConversion: "팔로워 전환 효율",
    moneyPerFollower: "팔로워당 수익",
  }[upgrade.effectType];

  return (
    <div className="grid gap-3 rounded-lg border border-white/10 bg-black/15 p-3 sm:grid-cols-[1fr_auto] sm:items-center">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-semibold">{upgrade.name}</h3>
          <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/70">
            Lv. {level}
          </span>
        </div>
        <p className="mt-1 text-sm text-white/70">{upgrade.description}</p>
        <p className="mt-2 text-xs font-semibold text-pink-100">
          +{formatNumber(upgrade.effectValue)} {effectLabel}
        </p>
      </div>

      <Button
        onClick={() => buyUpgrade(upgrade.id)}
        disabled={balance < cost}
        className="h-11 min-w-32 gap-2 px-4"
      >
        {formatNumber(cost)}
        {upgrade.currency === "money" ? "원" : ""}
        <ArrowUpRight size={16} />
      </Button>
    </div>
  );
}
