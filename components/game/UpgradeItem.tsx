"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/common/Button";
import type { Upgrade } from "@/features/game/types/game";
import { calculateUpgradeCost } from "@/features/game/utils/calculate";
import { formatNumber } from "@/features/game/utils/formatNumber";
import { playUiBlip } from "@/features/game/utils/sound";
import { useGameStore } from "@/features/game/store/useGameStore";
import { UpgradePixelArt } from "./UpgradePixelArt";

export function UpgradeItem({
  upgrade,
  locked = false,
}: {
  upgrade: Upgrade;
  locked?: boolean;
}) {
  const likes = useGameStore((state) => state.likes);
  const money = useGameStore((state) => state.money);
  const level = useGameStore((state) => state.upgradeLevels[upgrade.id] ?? 0);
  const buyUpgrade = useGameStore((state) => state.buyUpgrade);
  const cost = calculateUpgradeCost(upgrade.baseCost, level, upgrade.costMultiplier);
  const balance = upgrade.currency === "likes" ? likes : money;
  const canBuy = !locked && balance >= cost;
  const [burstId, setBurstId] = useState(0);
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

  function handleBuyUpgrade() {
    if (!canBuy || locked) {
      return;
    }

    buyUpgrade(upgrade.id);
    playUiBlip("upgrade");
    setBurstId(Date.now());
  }

  return (
    <motion.div
      animate={
        burstId
          ? {
              borderColor: [
                "rgba(255,255,255,0.1)",
                "rgba(250,204,21,0.75)",
                "rgba(255,255,255,0.1)",
              ],
              scale: [1, 1.01, 1],
            }
          : undefined
      }
      transition={{ duration: 0.35 }}
      className="relative grid gap-2 rounded-lg border border-white/10 bg-black/15 p-2.5 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-3 sm:p-3"
    >
      {burstId > 0 && (
        <motion.span
          key={burstId}
          initial={{ opacity: 0, y: 8, scale: 0.9 }}
          animate={{ opacity: [0, 1, 1, 0], y: -18, scale: 1 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="pointer-events-none absolute right-4 top-2 rounded-full bg-yellow-300 px-2 py-1 text-xs font-black text-slate-950 shadow-lg"
        >
          Lv +1
        </motion.span>
      )}
      <UpgradePixelArt
        upgradeId={locked ? "locked" : upgrade.id}
        active={!locked && level > 0}
        level={level}
      />
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-semibold">{locked ? "???" : upgrade.name}</h3>
          <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/70">
            {locked ? "잠김" : `Lv. ${level}`}
          </span>
        </div>
        {locked ? (
          <p className="mt-1 text-xs text-white/55 sm:text-sm">
            이전 업그레이드를 1회 구매하면 공개됩니다.
          </p>
        ) : (
          <>
            <p className="mt-1 text-xs text-white/70 sm:text-sm">{upgrade.description}</p>
            <p className="mt-2 text-xs font-semibold text-pink-100">
              +{formatNumber(upgrade.effectValue)} {effectLabel}
            </p>
            <p className="mt-1 text-[11px] font-semibold text-white/45">
              구매마다 가격 x{upgrade.costMultiplier.toFixed(2)}
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
          </>
        )}
        {locked && (
          <div className="mt-3 grid grid-cols-5 gap-1">
            {Array.from({ length: 10 }).map((_, index) => (
              <span key={index} className="h-1.5 rounded-full bg-white/10" />
            ))}
          </div>
        )}
      </div>

      <Button
        onClick={handleBuyUpgrade}
        disabled={!canBuy}
        className="h-10 min-w-28 gap-2 px-3 sm:h-11 sm:min-w-32 sm:px-4"
      >
        {locked ? (
          "???"
        ) : (
          <>
            {formatNumber(cost)}
            {upgrade.currency === "money" ? "원" : ""}
            <ArrowUpRight size={16} />
          </>
        )}
      </Button>
    </motion.div>
  );
}
