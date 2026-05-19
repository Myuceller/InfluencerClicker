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
};

const iconPatterns: Record<string, string[]> = {
  template: [".YYYY.", "YWWWWY", "YWKKWY", "YWWWWY", ".YYYY."],
  face: [".PPPP.", "PWWWWP", "PWKKWP", "PWPPWP", ".PPPP."],
  arrow: ["....R.", "...RR.", "RRRRRR", "...RR.", "....R."],
  circle: [".YYYY.", "Y....Y", "Y....Y", "Y....Y", ".YYYY."],
  text: ["WWWWW.", ".KKK..", "WWWWW.", "..KKK.", "WWWWW."],
  auto: [".BBBB.", "B.WW.B", "B.WW.B", "B....B", ".BBBB."],
  money: [".GGGG.", "G.WW.G", "G.GG.G", "G.WW.G", ".GGGG."],
  boost: [".VVV..", "VVVVV.", ".VVV..", ".VVV..", "VVVVV."],
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
}: {
  upgradeId: string;
  className?: string;
  active?: boolean;
}) {
  const pattern = getPatternForUpgrade(upgradeId);

  return (
    <div
      aria-hidden="true"
      className={cn(
        "grid w-fit gap-0.5 rounded border border-white/10 bg-black/20 p-1",
        !active && "opacity-35 grayscale",
        className,
      )}
      style={{ gridTemplateColumns: "repeat(6, minmax(0, 1fr))" }}
    >
      {pattern.flatMap((row, rowIndex) =>
        row.split("").map((pixel, columnIndex) => (
          <span
            key={`${rowIndex}-${columnIndex}`}
            className={cn(
              "size-1.5",
              pixel === "." ? "bg-transparent" : pixelPalettes[pixel],
            )}
          />
        )),
      )}
    </div>
  );
}
