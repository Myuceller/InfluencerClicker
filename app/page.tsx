"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BarChart3, MousePointerClick, ShoppingCart, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { AchievementList } from "@/components/game/AchievementList";
import { AnalyticsPanel } from "@/components/game/AnalyticsPanel";
import { AuthPanel } from "@/components/game/AuthPanel";
import { ClickButton } from "@/components/game/ClickButton";
import { GameCloudSync } from "@/components/game/GameCloudSync";
import { NotificationFeed } from "@/components/game/NotificationFeed";
import { ResourcePanel } from "@/components/game/ResourcePanel";
import { UpgradeShop } from "@/components/game/UpgradeShop";
import {
  initializeGame,
  useGameStore,
} from "@/features/game/store/useGameStore";

const mobileTabs = [
  { id: "make", label: "제작", icon: MousePointerClick },
  { id: "upgrades", label: "강화", icon: ShoppingCart },
  { id: "stats", label: "분석", icon: BarChart3 },
  { id: "achievements", label: "업적", icon: Trophy },
] as const;

type MobileTab = (typeof mobileTabs)[number]["id"];

export default function Home() {
  const hydrated = useGameStore((state) => state.hydrated);
  const [activeTab, setActiveTab] = useState<MobileTab>("make");

  useEffect(() => {
    initializeGame();
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.12),_transparent_24%),linear-gradient(135deg,_#ff4d8d_0%,_#7c3aed_48%,_#111827_100%)] px-3 py-3 pb-24 text-white sm:px-6 sm:py-4 lg:px-8 lg:pb-4">
      <GameCloudSync />
      <div className="mx-auto flex max-w-7xl flex-col gap-4">
        <header className="flex flex-col gap-2 rounded-lg border border-white/15 bg-white/10 p-3 shadow-2xl shadow-black/20 backdrop-blur sm:p-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-pink-100">
              크리에이터 대시보드
            </p>
            <h1 className="text-2xl font-black tracking-normal sm:text-4xl">
              Clout Clicker
            </h1>
          </div>
          <p className="max-w-md text-sm text-white/75">
            썸네일을 만들고, 좋아요를 모으고, 팔로워를 수익으로 바꿔보세요.
          </p>
        </header>

        <AnimatePresence mode="wait">
          {!hydrated ? (
            <motion.section
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-lg border border-white/15 bg-white/10 p-8 text-center text-white/80 backdrop-blur"
            >
              브랜드 제국 불러오는 중...
            </motion.section>
          ) : (
            <motion.section
              key="game"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]"
            >
              <div
                className={`flex-col gap-4 ${
                  activeTab === "make" ? "flex" : "hidden lg:flex"
                }`}
              >
                <ResourcePanel />
                <ClickButton />
                <NotificationFeed />
              </div>

              <div className="grid gap-4">
                <div className={activeTab === "make" ? "block lg:block" : "hidden lg:block"}>
                  <AuthPanel />
                </div>
                <div className={activeTab === "upgrades" ? "block" : "hidden lg:block"}>
                  <UpgradeShop />
                </div>
                <div className={activeTab === "stats" ? "block" : "hidden lg:block"}>
                  <AnalyticsPanel />
                </div>
                <div
                  className={
                    activeTab === "achievements" ? "block" : "hidden lg:block"
                  }
                >
                  <AchievementList />
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
      {hydrated && (
        <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-white/15 bg-slate-950/90 px-3 py-2 backdrop-blur lg:hidden">
          <div className="mx-auto grid max-w-md grid-cols-4 gap-2">
            {mobileTabs.map(({ id, label, icon: Icon }) => {
              const active = activeTab === id;

              return (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex h-12 flex-col items-center justify-center rounded-lg text-xs font-semibold transition ${
                    active
                      ? "bg-white text-slate-950"
                      : "bg-white/5 text-white/65"
                  }`}
                >
                  <Icon size={17} />
                  <span className="mt-0.5">{label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </main>
  );
}
