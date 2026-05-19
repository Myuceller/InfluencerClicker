"use client";

import { BarChart3 } from "lucide-react";
import { Card } from "@/components/common/Card";
import { useGameStore } from "@/features/game/store/useGameStore";
import { formatNumber } from "@/features/game/utils/formatNumber";

export function AnalyticsPanel() {
  const {
    totalClicks,
    totalLikes,
    thumbnailsPerClick,
    likesPerThumbnail,
    likesPerSecond,
    likesPerFollower,
    followers,
    moneyPerSecond,
    playTimeSeconds,
  } = useGameStore();
  const followerThreshold = Math.max(1, Math.floor(likesPerFollower));
  const likesUntilNextFollower =
    followerThreshold - (Math.floor(totalLikes) % followerThreshold);

  const rows = [
    ["총 클릭 수", formatNumber(totalClicks)],
    ["클릭당 썸네일", formatNumber(thumbnailsPerClick)],
    ["썸네일당 좋아요", formatNumber(likesPerThumbnail)],
    ["초당 좋아요", formatNumber(likesPerSecond)],
    ["총 누적 좋아요", formatNumber(totalLikes)],
    ["다음 팔로워까지", `${formatNumber(likesUntilNextFollower)} 좋아요`],
    ["팔로워", formatNumber(followers)],
    ["초당 수익", `${formatNumber(moneyPerSecond)}원`],
    ["플레이 시간", `${Math.floor(playTimeSeconds / 60)}분 ${playTimeSeconds % 60}초`],
  ];

  return (
    <Card className="p-4">
      <div className="mb-4 flex items-center gap-2">
        <BarChart3 size={18} className="text-cyan-200" />
        <div>
          <p className="text-xs font-semibold uppercase text-white/60">
            성장 흐름
          </p>
          <h2 className="text-xl font-bold">썸네일 → 좋아요 → 팔로워 → 수익</h2>
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
