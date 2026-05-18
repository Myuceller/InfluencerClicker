"use client";

import { Trophy } from "lucide-react";
import { Card } from "@/components/common/Card";
import { achievements } from "@/features/game/data/achievements";
import { useGameStore } from "@/features/game/store/useGameStore";

export function AchievementList() {
  const unlocked = useGameStore((state) => state.achievements);

  return (
    <Card className="p-4">
      <div className="mb-4 flex items-center gap-2">
        <Trophy size={18} className="text-yellow-200" />
        <h2 className="text-xl font-bold">업적</h2>
      </div>
      <div className="grid gap-2">
        {achievements.map((achievement) => {
          const isUnlocked = unlocked.includes(achievement.id);

          return (
            <div
              key={achievement.id}
              className="rounded-lg border border-white/10 bg-black/15 p-3"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold">{achievement.name}</h3>
                <span className="text-xs font-semibold text-white/60">
                  {isUnlocked ? "달성" : "미달성"}
                </span>
              </div>
              <p className="mt-1 text-sm text-white/70">{achievement.description}</p>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
