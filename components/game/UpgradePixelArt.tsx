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
  S: "bg-pink-100",
  T: "bg-amber-200",
  N: "bg-orange-200",
  A: "bg-slate-400",
  D: "bg-violet-300",
  L: "bg-lime-300",
};

const iconPatterns: Record<string, string[]> = {
  locked: [
    "....KKKKKKKK....",
    "...KAAAAAAAAK...",
    "..KAAAAAAAAAAK..",
    "..KAAA....AAAK..",
    "..KAA..KK..AAK..",
    "..KAA.KAAK.AAK..",
    "..KAA...AK.AAK..",
    "..KAAAAK..AAAK..",
    "..KAAAA..AAAAK..",
    "..KAAAA..AAAAK..",
    "..KAAAAAAAAAAK..",
    "..KAAAAKKAAAAK..",
    "..KAAAAKKAAAAK..",
    "..KAAAAAAAAAAK..",
    "...KAAAAAAAAK...",
    "....KKKKKKKK....",
  ],
  template: [
    "....KKKKKKKK....",
    "...KWWWWWWWWK...",
    "..KWBWBWBWBWK...",
    "..KWWWWWWWWWWK..",
    "..KWKKWWWWKKWK..",
    "..KWWWWWWWWWWK..",
    "..KWWKKKKKWWWK..",
    "..KWWWWWWWWWWK..",
    "..KWWYYYYYYWWK..",
    "..KWWYYYYYYWWK..",
    "..KWWWWWWWWWWK..",
    "..KWWKKKKKKWWK..",
    "..KWWWWWWWWWWK..",
    "...KWWWWWWWWK...",
    "....KKKKKKKK....",
    "................",
  ],
  face: [
    ".....AAAAAA.....",
    "...AASSSSSSAA...",
    "..ASSSSSSSSSSA..",
    ".ASSSSTTTTSSSA..",
    ".ASSTTSSSSTTSA..",
    ".ASSSKSSSSKSSA..",
    "ASSSSSSSSSSSSSA.",
    "ASSSRRSSSSRRSSA.",
    "ASSSSRRRRRSSSSA.",
    ".ASSSSSSSSSSSA..",
    ".AASSSKKSSSSAA..",
    "..AASSSSSSSAA...",
    "...AAASSSAAA....",
    ".....APPPPA.....",
    "....PPPPPPPP....",
    "................",
  ],
  arrow: [
    "..........RR....",
    ".........RRR....",
    "........RRRR....",
    ".......RRRRR....",
    "......RRRRRR....",
    "RRRRRRRRRRRRRR..",
    "RRRRRRRRRRRRRRR.",
    "RRRRRRRRRRRRRRRR",
    "RRRRRRRRRRRRRRR.",
    "RRRRRRRRRRRRRR..",
    "......RRRRRR....",
    ".......RRRRR....",
    "........RRRR....",
    ".........RRR....",
    "..........RR....",
    "................",
  ],
  circle: [
    ".....YYYYYY.....",
    "...YYYYYYYYYY...",
    "..YYY......YYY..",
    ".YYY........YYY.",
    ".YY..........YY.",
    "YYY..........YYY",
    "YY............YY",
    "YY............YY",
    "YY............YY",
    "YY............YY",
    "YYY..........YYY",
    ".YY..........YY.",
    ".YYY........YYY.",
    "..YYY......YYY..",
    "...YYYYYYYYYY...",
    ".....YYYYYY.....",
  ],
  text: [
    "..KKKKKKKKKKKK..",
    ".KWWWWWWWWWWWWK.",
    "KWWRRRRRRRRRWWK.",
    "KWWWWWWWWWWWWWK.",
    "KWWKKKKKKKWWWWK.",
    "KWWWWWWWWWWWWWK.",
    "KWWYYYYYYYYYWWK.",
    "KWWYYYYYYYYYWWK.",
    "KWWWWWWWWWWWWWK.",
    "KWWKKKKKKKKKWWK.",
    "KWWWWWWWWWWWWWK.",
    "KWWRRRRRRRRRWWK.",
    "KWWWWWWWWWWWWWK.",
    ".KWWWWWWWWWWWWK.",
    "..KKKKKKKKKKKK..",
    "................",
  ],
  auto: [
    ".....CCCCCC.....",
    "...CCBBBBBBCC...",
    "..CBWWWWWWWWBC..",
    ".CBWWBWWWWBWWBC.",
    ".CBWWWWWWWWWWBC.",
    "CBWWWWKWWKWWWWBC",
    "CBWWWWWWWWWWWWBC",
    "CBWWWKKKKKKWWWBC",
    "CBWWWWWWWWWWWWBC",
    ".CBWWBWWWWBWWBC.",
    ".CBWWWWWWWWWWBC.",
    "..CBWWWWWWWWBC..",
    "...CCBBBBBBCC...",
    ".....CC..CC.....",
    "....CC....CC....",
    "................",
  ],
  money: [
    "......GGGG......",
    ".....GLLLLG.....",
    "......GGGG......",
    "....GGGGGGGG....",
    "...GGLLLLLLGG...",
    "..GLLLLLLLLLLG..",
    ".GLLLLKLLKLLLLG.",
    ".GLLLLKLLKLLLLG.",
    ".GLLLLLLLLLLLLG.",
    ".GLLLKKKKKLLLLG.",
    "..GLLLLLLLLLLG..",
    "...GLLLLLLLLG...",
    "....GGLLLLGG....",
    "......GGGG......",
    "................",
    "................",
  ],
  boost: [
    ".......VV.......",
    "......VVV.......",
    ".....VVVV.......",
    "....VVVV........",
    "...VVVVV........",
    "..VVVVVVVVV.....",
    "..VVVVVVVV......",
    "......VVV.......",
    ".....VVV........",
    "....VVV.........",
    "...VVV..........",
    "..VVV...........",
    ".VVVVVVVVVVVV...",
    ".VVVVVVVVVVVV...",
    "................",
    "................",
  ],
  hand: [
    ".......KK.......",
    "......KWWK......",
    "......KWWK......",
    "......KWWK......",
    "...KK.KWWK......",
    "..KWWKKWWK......",
    "..KWWWWWWKKK....",
    "..KWWWWWWWWWK...",
    "..KWWWWWWWWWK...",
    "...KWWWWWWWWK...",
    "....KWWWWWWK....",
    ".....KWWWWK.....",
    "......KWWK......",
    "......KWWK......",
    ".......KK.......",
    "................",
  ],
};

function getPatternForUpgrade(upgradeId: string) {
  if (upgradeId === "locked") return iconPatterns.locked;
  if (
    upgradeId.includes("template") ||
    upgradeId.includes("hotkeys") ||
    upgradeId.includes("thumbnail-batch")
  ) {
    return iconPatterns.hand;
  }
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
  const columns = pattern[0]?.length ?? 16;
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
        compact ? "gap-px p-1" : "gap-px p-1.5",
        active ? "border-white/20" : "border-white/10 opacity-35 grayscale",
        milestoneGlow,
        className,
      )}
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {pattern.flatMap((row, rowIndex) =>
        row.split("").map((pixel, columnIndex) => (
          <span
            key={`${rowIndex}-${columnIndex}`}
            className={cn(
              compact ? "size-0.5" : "size-1",
              pixel === "." ? "bg-transparent" : pixelPalettes[pixel],
            )}
          />
        )),
      )}
    </div>
  );
}
