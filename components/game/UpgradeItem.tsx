"use client";

import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/common/Button";
import type { Upgrade } from "@/features/game/types/game";
import { calculateUpgradeCost } from "@/features/game/utils/calculate";
import { formatNumber } from "@/features/game/utils/formatNumber";
import { useGameStore } from "@/features/game/store/useGameStore";
import { UpgradePixelArt } from "./UpgradePixelArt";

export function UpgradeItem({ upgrade }: { upgrade: Upgrade }) {
  const likes = useGameStore((state) => state.likes);
  const money = useGameStore((state) => state.money);
  const level = useGameStore((state) => state.upgradeLevels[upgrade.id] ?? 0);
  const buyUpgrade = useGameStore((state) => state.buyUpgrade);
  const cost = calculateUpgradeCost(upgrade.baseCost, level, upgrade.costMultiplier);
  const balance = upgrade.currency === "likes" ? likes : money;
  const progressToMilestone = Math.min(100, ((level % 10) / 10) * 100);
  const nextMilestone = Math.floor(level / 10) * 10 + 10;
  const effectLabel = {
    thumbnail: "클릭당 썸네일",
    thumbnailMultiplier: "클릭 썸네일 배율",
    autoThumbnail: "초당 자동 썸네일",
    likesPerThumbnail: "썸네일당 좋아요",
    likesMultiplier: "좋아요 배율",
    followerConversion: "팔로워 전환 효율",
    moneyPerFollower: "팔로워당 수익",
    moneyMultiplier: "수익 배율",
  }[upgrade.effectType];

  return (
    <div className="grid gap-3 rounded-lg border border-white/10 bg-black/15 p-3 sm:grid-cols-[auto_1fr_auto] sm:items-center">
      <UpgradePixelArt upgradeId={upgrade.id} active={level > 0} level={level} />
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
        <div className="mt-3">
          <div className="mb-1 flex items-center justify-between text-[11px] font-semibold text-white/45">
            <span>강화 밀도</span>
            <span>Lv. {nextMilestone}까지</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-yellow-300 via-pink-400 to-cyan-300"
              style={{ width: `${progressToMilestone}%` }}
            />
          </div>
        </div>
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
