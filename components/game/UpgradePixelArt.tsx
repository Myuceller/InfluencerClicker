import { cn } from "@/lib/cn";

const pixelPalettes: Record<string, string> = {
  R: "bg-red-500",
  Y: "bg-yellow-300",
  B: "bg-sky-300",
  P: "bg-pink-400",
  V: "bg-violet-500",
  G: "bg-emerald-400",
  W: "bg-white",
  K: "bg-slate-950",
  O: "bg-orange-400",
  C: "bg-cyan-200",
};

const iconPatterns: Record<string, string[]> = {
  template: [
    "..YYYYYYYY..",
    ".YWWWWWWWWY.",
    "YWWKKWWKKWWY",
    "YWWWWWWWWWWY",
    "YWWKKKKKKWWY",
    "YWWWWWWWWWWY",
    ".YWWWWWWWWY.",
    "..YYYYYYYY..",
  ],
  face: [
    "...PPPPPP...",
    "..PWWWWWWP..",
    ".PWWKWWKWWP.",
    "PWWWWWWWWWWP",
    "PWWPPPPPPWWP",
    ".PWWWWWWWWP.",
    "..PWWWWWWP..",
    "...PPPPPP...",
  ],
  arrow: [
    "........RR..",
    ".......RRR..",
    "RRRRRRRRRRRR",
    "RRRRRRRRRRRR",
    ".......RRR..",
    "........RR..",
    "............",
    "............",
  ],
  circle: [
    "...YYYYYY...",
    ".YY......YY.",
    "YY........YY",
    "Y..........Y",
    "Y..........Y",
    "YY........YY",
    ".YY......YY.",
    "...YYYYYY...",
  ],
  text: [
    "WWWWWWWWWW..",
    ".KKKKKKKK...",
    "WWWWWWWWWW..",
    "...KKKKKKK..",
    "WWWWWWWWWW..",
    ".KKKKKKKK...",
    "WWWWWWWWWW..",
    "............",
  ],
  auto: [
    "..BBBBBBBB..",
    ".BWWWWWWWWB.",
    "BWWBBWWBBWWB",
    "BWWWWWWWWWWB",
    "BWWBBWWBBWWB",
    "BWWWWWWWWWWB",
    ".BWWWWWWWWB.",
    "..BBBBBBBB..",
  ],
  money: [
    "...GGGGGG...",
    ".GGWWWWWWGG.",
    "GGWWGGGGWWGG",
    "GWWGGWWGGWWG",
    "GWWGGWWGGWWG",
    "GGWWGGGGWWGG",
    ".GGWWWWWWGG.",
    "...GGGGGG...",
  ],
  boost: [
    "....VVV.....",
    "...VVVVV....",
    "..VVVVVVV...",
    ".VVVVVVVVV..",
    "...VVVVV....",
    "...VVVVV....",
    "...VVVVV....",
    "..VVVVVVV...",
  ],
};

function getPatternForUpgrade(upgradeId: string) {
  if (upgradeId.includes("arrow")) return iconPatterns.arrow;
  if (upgradeId.includes("circle")) return iconPatterns.circle;
  if (upgradeId.includes("face")) return iconPatterns.face;
  if (upgradeId.includes("copy") || upgradeId.includes("hook")) {
    return iconPatterns.text;
  }
  if (
    upgradeId.includes("auto") ||
    upgradeId.includes("editor") ||
    upgradeId.includes("team") ||
    upgradeId.includes("studio")
  ) {
    return iconPatterns.auto;
  }
  if (
    upgradeId.includes("brand") ||
    upgradeId.includes("media") ||
    upgradeId.includes("affiliate") ||
    upgradeId.includes("merch")
  ) {
    return iconPatterns.money;
  }
  if (
    upgradeId.includes("algorithm") ||
    upgradeId.includes("dashboard") ||
    upgradeId.includes("agency")
  ) {
    return iconPatterns.boost;
  }

  return iconPatterns.template;
}

export function UpgradePixelArt({
  upgradeId,
  className,
  active = true,
  level = 0,
  compact = false,
}: {
  upgradeId: string;
  className?: string;
  active?: boolean;
  level?: number;
  compact?: boolean;
}) {
  const pattern = getPatternForUpgrade(upgradeId);
  const milestoneGlow =
    level >= 10
      ? "shadow-[0_0_18px_rgba(250,204,21,0.6)]"
      : level >= 5
        ? "shadow-[0_0_14px_rgba(244,114,182,0.5)]"
        : "";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "grid w-fit rounded border bg-black/25",
        compact ? "gap-px p-1" : "gap-0.5 p-1.5",
        active ? "border-white/20" : "border-white/10 opacity-35 grayscale",
        milestoneGlow,
        className,
      )}
      style={{ gridTemplateColumns: "repeat(12, minmax(0, 1fr))" }}
    >
      {pattern.flatMap((row, rowIndex) =>
        row.split("").map((pixel, columnIndex) => (
          <span
            key={`${rowIndex}-${columnIndex}`}
            className={cn(
              compact ? "size-1" : "size-1.5",
              pixel === "." ? "bg-transparent" : pixelPalettes[pixel],
            )}
          />
        )),
      )}
    </div>
  );
}
