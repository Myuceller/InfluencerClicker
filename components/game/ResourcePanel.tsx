"use client";

import { Heart, Users, Wallet } from "lucide-react";
import { Card } from "@/components/common/Card";
import { formatNumber } from "@/features/game/utils/formatNumber";
import { useGameStore } from "@/features/game/store/useGameStore";

const resources = [
  {
    key: "likes",
    label: "좋아요",
    hint: "메인 업그레이드 재화",
    icon: Heart,
    accent: "text-pink-100",
    cardClass: "border-pink-300/45 bg-pink-500/25 shadow-pink-950/25",
    valueClass: "text-pink-50",
  },
  {
    key: "followers",
    label: "팔로워",
    hint: "누적 좋아요로 증가",
    icon: Users,
    accent: "text-cyan-200",
    cardClass: "border-cyan-300/25 bg-cyan-400/10",
    valueClass: "text-cyan-50",
  },
  {
    key: "money",
    label: "수익",
    hint: "후반 업그레이드 재화",
    icon: Wallet,
    accent: "text-emerald-200",
    cardClass: "border-emerald-300/25 bg-emerald-400/10",
    valueClass: "text-emerald-50",
  },
] as const;

export function ResourcePanel() {
  const state = useGameStore();

  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3">
      {resources.map(
        ({ key, label, hint, icon: Icon, accent, cardClass, valueClass }) => (
        <Card key={key} className={`p-2.5 sm:p-3 ${cardClass}`}>
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold uppercase text-white/60">
              {label}
            </span>
            <Icon className={accent} size={16} />
          </div>
          <p className={`mt-2 text-xl font-bold sm:mt-3 sm:text-2xl ${valueClass}`}>
            {formatNumber(state[key])}
            {key === "money" ? "원" : ""}
          </p>
          <p className="mt-1 text-xs text-white/45">{hint}</p>
        </Card>
        ),
      )}
    </div>
  );
}
