"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ImagePlus, MousePointerClick, TrendingUp } from "lucide-react";
import { Card } from "@/components/common/Card";
import { upgrades } from "@/features/game/data/upgrades";
import { useGameStore } from "@/features/game/store/useGameStore";
import { formatNumber } from "@/features/game/utils/formatNumber";
import { playUiBlip } from "@/features/game/utils/sound";
import { UpgradePixelArt } from "./UpgradePixelArt";

type ClickBurst = {
  id: number;
  value: number;
  x: number;
  y: number;
};

function ThumbnailPreview({
  thumbnailVariant,
}: {
  thumbnailVariant: number;
}) {
  const upgradeLevels = useGameStore((state) => state.upgradeLevels);
  const redArrowLevel = upgradeLevels["red-arrow"] ?? 0;
  const yellowCircleLevel = upgradeLevels["yellow-circle"] ?? 0;
  const copyLevel = upgradeLevels["clickbait-copy"] ?? 0;
  const hookLevel = upgradeLevels["three-second-hook"] ?? 0;
  const brandLevel = upgradeLevels["brand-deal"] ?? 0;
  const dashboardLevel = upgradeLevels["viral-dashboard"] ?? 0;
  const faceLevel = upgradeLevels["shocked-face"] ?? 0;
  const intensity = Math.min(
    1,
    (redArrowLevel +
      yellowCircleLevel +
      copyLevel +
      hookLevel +
      brandLevel +
      dashboardLevel +
      faceLevel) /
      18,
  );

  return (
    <motion.div
      key={thumbnailVariant}
      initial={{ rotate: -4, scale: 0.92, y: 8 }}
      animate={{ rotate: 0, scale: 1 + intensity * 0.03, y: 0 }}
      transition={{ type: "spring", stiffness: 420, damping: 22 }}
      className="relative mb-5 aspect-video w-48 rounded-lg border-4 border-slate-950 bg-white p-2 shadow-xl sm:w-56"
    >
      <div className="relative flex h-full items-center justify-between overflow-hidden rounded bg-gradient-to-br from-fuchsia-500 via-pink-400 to-yellow-300 p-3">
        <div className="grid gap-2">
          <span className="h-4 w-20 rounded bg-white" />
          <span className="h-3 w-14 rounded bg-slate-950" />
          <span className="h-3 w-24 rounded bg-white/80" />
        </div>
        <div
          className="grid place-items-center rounded-full bg-white font-black text-pink-600"
          style={{
            width: `${64 + faceLevel * 3}px`,
            height: `${64 + faceLevel * 3}px`,
            fontSize: `${30 + faceLevel}px`,
          }}
        >
          !
        </div>

        {redArrowLevel > 0 && (
          <div
            className="absolute right-8 top-8 h-4 bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.65)]"
            style={{ width: `${46 + redArrowLevel * 5}px` }}
          >
            <span className="absolute -right-4 -top-2 size-0 border-y-[14px] border-l-[18px] border-y-transparent border-l-red-600" />
          </div>
        )}

        {yellowCircleLevel > 0 && (
          <div
            className="absolute left-4 top-4 rounded-full border-[6px] border-yellow-300 bg-transparent"
            style={{
              width: `${50 + yellowCircleLevel * 4}px`,
              height: `${50 + yellowCircleLevel * 4}px`,
              boxShadow: "0 0 12px rgba(250, 204, 21, 0.65)",
            }}
          />
        )}

        {copyLevel > 0 && (
          <div className="absolute bottom-2 left-2 right-2 border-2 border-slate-950 bg-white px-2 py-1 text-center text-xs font-black text-slate-950">
            이걸 모르면 손해
          </div>
        )}

        {hookLevel > 0 && (
          <div className="absolute left-2 top-2 bg-slate-950 px-2 py-1 text-[10px] font-black text-yellow-300">
            3초 후 공개
          </div>
        )}

        {brandLevel > 0 && (
          <div className="absolute right-2 bottom-2 rounded bg-emerald-300 px-2 py-1 text-[10px] font-black text-slate-950">
            AD
          </div>
        )}

        {dashboardLevel > 0 && (
          <div className="absolute right-2 top-2 grid grid-cols-3 gap-0.5 rounded bg-black/70 p-1">
            {Array.from({ length: 9 }).map((_, index) => (
              <span
                key={index}
                className="size-1.5 bg-cyan-300"
                style={{ opacity: 0.35 + ((index + dashboardLevel) % 5) * 0.13 }}
              />
            ))}
          </div>
        )}
      </div>
      <span className="absolute -right-3 -top-3 rounded bg-yellow-300 px-2 py-1 text-xs font-black text-slate-950 shadow">
        NEW
      </span>
    </motion.div>
  );
}

const pixelScenes = [
  {
    minFollowers: 0,
    label: "방구석 크리에이터",
    rows: [
      "................",
      "....PPP.........",
      "...PPPPP........",
      "...PSSSP........",
      "..PSSSSSP.......",
      "..PSBBSSP.......",
      "..PSSSSSP.......",
      "...PPPPP....HH..",
      "....PPP....HHHH.",
      "....DDD....HYYH.",
      "...DDDDD...HHHH.",
      "...D.D.D....HH..",
    ],
  },
  {
    minFollowers: 25,
    label: "조명 장착",
    rows: [
      "......RR........",
      "....PPP.R.......",
      "...PPPPP.R......",
      "...PSSSP.R......",
      "..PSSSSSP.......",
      "..PSBBSSP....HH.",
      "..PSSSSSP...HHHH",
      "...PPPPP....HYYH",
      "....PPP.....HHHH",
      "....DDD......HH.",
      "...DDDDD........",
      "...D.D.D........",
    ],
  },
  {
    minFollowers: 100,
    label: "댓글 폭주",
    rows: [
      "..C...RR....C...",
      ".CCC.PPP.R.CCC..",
      "..C.PPPPP.R.C...",
      "...PSSSP.R......",
      "..PSSSSSP...HH..",
      "..PSBBSSP..HHHH.",
      "..PSSSSSP..HYYH.",
      "...PPPPP...HHHH.",
      "....PPP.....HH..",
      "....DDD.........",
      "...DDDDD........",
      "...D.D.D........",
    ],
  },
  {
    minFollowers: 500,
    label: "브랜드 협찬",
    rows: [
      "..C...RR....C...",
      ".CCC.PPP.R.CCC..",
      "..C.PPPPP.R.C...",
      "...PSSSP.R..GG..",
      "..PSSSSSP..GYYG.",
      "..PSBBSSP..GGGG.",
      "..PSSSSSP...HH..",
      "...PPPPP...HHHH.",
      "....PPP....HYYH.",
      "....DDD....HHHH.",
      "...DDDDD....HH..",
      "...D.D.D........",
    ],
  },
];

const pixelColors: Record<string, string> = {
  P: "bg-fuchsia-300",
  S: "bg-pink-100",
  B: "bg-slate-950",
  D: "bg-violet-400",
  H: "bg-yellow-200",
  Y: "bg-pink-500",
  R: "bg-cyan-200",
  C: "bg-white",
  G: "bg-emerald-200",
};

function PixelCreatorArt({ followers }: { followers: number }) {
  const scene =
    [...pixelScenes].reverse().find((item) => followers >= item.minFollowers) ??
    pixelScenes[0];

  return (
    <div className="mt-4 rounded-lg border border-white/10 bg-black/15 p-4">
      <div className="mb-3 flex items-center justify-between gap-3 text-xs font-semibold text-white/65">
        <span>현재 무드</span>
        <span>{scene.label}</span>
      </div>
      <div
        aria-hidden="true"
        className="mx-auto grid w-fit gap-1"
        style={{ gridTemplateColumns: "repeat(16, minmax(0, 1fr))" }}
      >
        {scene.rows.flatMap((row, rowIndex) =>
          row.split("").map((pixel, columnIndex) => (
            <span
              key={`${rowIndex}-${columnIndex}`}
              className={`size-3 sm:size-4 ${
                pixel === "." ? "bg-transparent" : pixelColors[pixel]
              }`}
            />
          )),
        )}
      </div>
    </div>
  );
}

function UpgradeThumbnailBoard() {
  const upgradeLevels = useGameStore((state) => state.upgradeLevels);
  const ownedUpgrades = upgrades
    .filter((upgrade) => (upgradeLevels[upgrade.id] ?? 0) > 0)
    .slice(0, 18);

  return (
    <div className="mt-4 rounded-lg border border-white/10 bg-black/15 p-4">
      <div className="mb-3 flex items-center justify-between gap-3 text-xs font-semibold text-white/65">
        <span>썸네일에 붙은 장식</span>
        <span>{ownedUpgrades.length}개 활성화</span>
      </div>
      <div className="grid min-h-20 grid-cols-6 gap-2 sm:grid-cols-9">
        {ownedUpgrades.length === 0 ? (
          <p className="col-span-full self-center text-sm text-white/45">
            업그레이드를 사면 도트 장식이 하나씩 붙습니다.
          </p>
        ) : (
          ownedUpgrades.map((upgrade) => (
            <div
              key={upgrade.id}
              className="grid place-items-center rounded bg-white/5 p-1"
              title={upgrade.name}
            >
              <UpgradePixelArt
                upgradeId={upgrade.id}
                level={upgradeLevels[upgrade.id] ?? 0}
                compact
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export function ClickButton() {
  const thumbnailsPerClick = useGameStore((state) => state.thumbnailsPerClick);
  const followers = useGameStore((state) => state.followers);
  const createThumbnail = useGameStore((state) => state.createThumbnail);
  const [bursts, setBursts] = useState<ClickBurst[]>([]);
  const [thumbnailVariant, setThumbnailVariant] = useState(0);

  function handleCreateThumbnail(event: React.MouseEvent<HTMLButtonElement>) {
    createThumbnail();
    playUiBlip("click");

    const rect = event.currentTarget.getBoundingClientRect();
    const burst = {
      id: Date.now() + Math.random(),
      value: thumbnailsPerClick,
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };

    setThumbnailVariant((current) => (current + 1) % 4);
    setBursts((current) => [...current.slice(-8), burst]);
    window.setTimeout(() => {
      setBursts((current) => current.filter((item) => item.id !== burst.id));
    }, 700);
  }

  return (
    <Card className="overflow-hidden p-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase text-white/60">
            썸네일 공장
          </p>
          <h2 className="text-xl font-bold">멈출 수 없는 클릭 유도</h2>
        </div>
        <span className="rounded-full bg-black/20 px-3 py-1 text-sm font-semibold text-pink-100">
          클릭당 썸네일 +{formatNumber(thumbnailsPerClick)}
        </span>
      </div>

      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{
          scale: 0.965,
          y: 3,
          boxShadow: "0 12px 28px rgba(112, 26, 117, 0.25)",
        }}
        onClick={handleCreateThumbnail}
        className="relative flex min-h-72 w-full overflow-hidden flex-col items-center justify-center rounded-lg border border-white/20 bg-gradient-to-br from-white via-pink-100 to-fuchsia-200 text-slate-950 shadow-2xl shadow-pink-950/25 sm:min-h-80"
      >
        <div className="absolute inset-0 bg-[linear-gradient(120deg,_transparent_0%,_rgba(255,255,255,0.7)_45%,_transparent_62%)] opacity-40" />
        <ThumbnailPreview thumbnailVariant={thumbnailVariant} />
        <ImagePlus size={44} className="relative" />
        <span className="relative mt-4 text-4xl font-black">썸네일 만들기</span>
        <span className="relative mt-2 inline-flex items-center gap-1 text-sm font-semibold text-slate-700">
          <TrendingUp size={16} />
          클릭하고 싶은 표정 제작 중
        </span>
        <span className="relative mt-4 inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white">
          <MousePointerClick size={16} />
          누를 때마다 +{formatNumber(thumbnailsPerClick)}
        </span>

        {bursts.map((burst) => (
          <motion.span
            key={burst.id}
            initial={{ opacity: 0, scale: 0.75, y: 0 }}
            animate={{ opacity: [0, 1, 1, 0], scale: 1.1, y: -58 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="pointer-events-none absolute z-10 rounded-full bg-slate-950 px-3 py-1 text-sm font-black text-yellow-200 shadow-lg"
            style={{
              left: burst.x,
              top: burst.y,
              transform: "translate(-50%, -50%)",
            }}
          >
            +{formatNumber(burst.value)} 썸네일
          </motion.span>
        ))}
      </motion.button>

      <UpgradeThumbnailBoard />
      <PixelCreatorArt followers={followers} />
    </Card>
  );
}
