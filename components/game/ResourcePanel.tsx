"use client";

import { Heart, ImageIcon, Users, Wallet } from "lucide-react";
import { Card } from "@/components/common/Card";
import { formatNumber } from "@/features/game/utils/formatNumber";
import { useGameStore } from "@/features/game/store/useGameStore";

const resources = [
  {
    key: "thumbnails",
    label: "썸네일",
    hint: "클릭으로 만드는 원천",
    icon: ImageIcon,
    accent: "text-yellow-200",
  },
  {
    key: "likes",
    label: "좋아요",
    hint: "업그레이드 재화",
    icon: Heart,
    accent: "text-pink-200",
  },
  {
    key: "followers",
    label: "팔로워",
    hint: "누적 좋아요로 증가",
    icon: Users,
    accent: "text-cyan-200",
  },
  {
    key: "money",
    label: "수익",
    hint: "협찬 업그레이드 재화",
    icon: Wallet,
    accent: "text-emerald-200",
  },
] as const;

export function ResourcePanel() {
  const state = useGameStore();

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
      {resources.map(({ key, label, hint, icon: Icon, accent }) => (
        <Card key={key} className="p-2.5 sm:p-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold uppercase text-white/60">
              {label}
            </span>
            <Icon className={accent} size={16} />
          </div>
          <p className="mt-2 text-xl font-bold sm:mt-3 sm:text-2xl">
            {formatNumber(state[key])}
            {key === "money" ? "원" : ""}
          </p>
          <p className="mt-1 text-xs text-white/45">{hint}</p>
        </Card>
      ))}
    </div>
  );
}
