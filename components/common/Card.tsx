import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-lg border border-white/15 bg-white/10 shadow-xl shadow-black/15 backdrop-blur",
        className,
      )}
      {...props}
    />
  );
}
