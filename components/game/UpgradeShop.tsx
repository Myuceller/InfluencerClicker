"use client";

import { Card } from "@/components/common/Card";
import { upgrades } from "@/features/game/data/upgrades";
import { UpgradeItem } from "./UpgradeItem";

export function UpgradeShop() {
  return (
    <Card className="p-4">
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase text-white/60">
          성장 장치
        </p>
        <h2 className="text-xl font-bold">썸네일 성능 업그레이드</h2>
      </div>
      <div className="grid gap-3">
        {upgrades.map((upgrade) => (
          <UpgradeItem key={upgrade.id} upgrade={upgrade} />
        ))}
      </div>
    </Card>
  );
}
