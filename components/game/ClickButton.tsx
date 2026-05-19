"use client";

import { motion } from "framer-motion";
import { ImagePlus, TrendingUp } from "lucide-react";
import { Card } from "@/components/common/Card";
import { useGameStore } from "@/features/game/store/useGameStore";
import { formatNumber } from "@/features/game/utils/formatNumber";

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

export function ClickButton() {
  const thumbnailsPerClick = useGameStore((state) => state.thumbnailsPerClick);
  const followers = useGameStore((state) => state.followers);
  const createThumbnail = useGameStore((state) => state.createThumbnail);

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
        whileTap={{ scale: 0.97 }}
        onClick={createThumbnail}
        className="flex min-h-72 w-full flex-col items-center justify-center rounded-lg border border-white/20 bg-gradient-to-br from-white via-pink-100 to-fuchsia-200 text-slate-950 shadow-2xl shadow-pink-950/25 sm:min-h-80"
      >
        <ImagePlus size={52} />
        <span className="mt-4 text-4xl font-black">썸네일 만들기</span>
        <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-slate-700">
          <TrendingUp size={16} />
          클릭하고 싶은 표정 제작 중
        </span>
      </motion.button>

      <PixelCreatorArt followers={followers} />
    </Card>
  );
}
