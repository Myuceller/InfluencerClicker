"use client";

import { Heart, Sparkles, Users, Zap } from "lucide-react";
import { Card } from "@/components/common/Card";
import { formatNumber } from "@/features/game/utils/formatNumber";
import { useGameStore } from "@/features/game/store/useGameStore";

const resources = [
  { key: "likes", label: "좋아요", icon: Heart, accent: "text-pink-200" },
  { key: "followers", label: "팔로워", icon: Users, accent: "text-cyan-200" },
  { key: "dopamine", label: "도파민", icon: Zap, accent: "text-yellow-200" },
  { key: "clout", label: "영향력", icon: Sparkles, accent: "text-fuchsia-200" },
] as const;

export function ResourcePanel() {
  const state = useGameStore();

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {resources.map(({ key, label, icon: Icon, accent }) => (
        <Card key={key} className="p-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold uppercase text-white/60">
              {label}
            </span>
            <Icon className={accent} size={16} />
          </div>
          <p className="mt-3 text-2xl font-bold">{formatNumber(state[key])}</p>
        </Card>
      ))}
    </div>
  );
}
