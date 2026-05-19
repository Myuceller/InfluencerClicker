"use client";

import { BarChart3 } from "lucide-react";
import { Card } from "@/components/common/Card";
import { useGameStore } from "@/features/game/store/useGameStore";
import { formatNumber } from "@/features/game/utils/formatNumber";

function formatStatNumber(value: number) {
  if (value < 10 && !Number.isInteger(value)) {
    return value.toLocaleString("en-US", { maximumFractionDigits: 1 });
  }

  return formatNumber(value);
}

function formatMultiplier(value: number) {
  return `${value.toLocaleString("en-US", { maximumFractionDigits: 2 })}x`;
}

export function AnalyticsPanel() {
  const totalClicks = useGameStore((state) => state.totalClicks);
  const totalLikes = useGameStore((state) => state.totalLikes);
  const likesPerClick = useGameStore((state) => state.likesPerClick);
  const autoLikesPerSecond = useGameStore((state) => state.autoLikesPerSecond);
  const clickMultiplier = useGameStore((state) => state.clickMultiplier);
  const likesMultiplier = useGameStore((state) => state.likesMultiplier);
  const likesPerSecond = useGameStore((state) => state.likesPerSecond);
  const likesPerFollower = useGameStore((state) => state.likesPerFollower);
  const followers = useGameStore((state) => state.followers);
  const moneyMultiplier = useGameStore((state) => state.moneyMultiplier);
  const moneyPerSecond = useGameStore((state) => state.moneyPerSecond);
  const playTimeSeconds = useGameStore((state) => state.playTimeSeconds);
  const followerThreshold = Math.max(1, Math.floor(likesPerFollower));
  const likesUntilNextFollower =
    followerThreshold - (Math.floor(totalLikes) % followerThreshold);
  const wholePlayTimeSeconds = Math.floor(playTimeSeconds);

  const rows = [
    ["총 클릭 수", formatNumber(totalClicks)],
    ["클릭당 좋아요", formatStatNumber(likesPerClick)],
    ["클릭 좋아요 배율", formatMultiplier(clickMultiplier)],
    ["초당 자동 좋아요", formatStatNumber(autoLikesPerSecond)],
    ["좋아요 배율", formatMultiplier(likesMultiplier)],
    ["초당 좋아요", formatStatNumber(likesPerSecond)],
    ["총 누적 좋아요", formatNumber(totalLikes)],
    ["다음 팔로워까지", `${formatNumber(likesUntilNextFollower)} 좋아요`],
    ["팔로워", formatNumber(followers)],
    ["수익 배율", formatMultiplier(moneyMultiplier)],
    ["초당 수익", `${formatStatNumber(moneyPerSecond)}원`],
    [
      "플레이 시간",
      `${Math.floor(wholePlayTimeSeconds / 60)}분 ${wholePlayTimeSeconds % 60}초`,
    ],
  ];

  return (
    <Card className="p-4">
      <div className="mb-4 flex items-center gap-2">
        <BarChart3 size={18} className="text-cyan-200" />
        <div>
          <p className="text-xs font-semibold uppercase text-white/60">
            성장 흐름
          </p>
          <h2 className="text-xl font-bold">좋아요 → 팔로워 → 수익</h2>
        </div>
      </div>
      <dl className="grid gap-3">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between gap-3">
            <dt className="text-sm text-white/65">{label}</dt>
            <dd className="font-semibold">{value}</dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}
