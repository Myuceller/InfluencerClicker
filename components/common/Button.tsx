import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "likes" | "money";
};

export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 disabled:cursor-not-allowed disabled:opacity-50",
        variant === "primary" &&
          "bg-white text-slate-950 shadow-lg shadow-pink-950/20 hover:bg-pink-50",
        variant === "likes" &&
          "bg-pink-500 text-white shadow-lg shadow-pink-950/30 hover:bg-pink-400",
        variant === "money" &&
          "bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-950/25 hover:bg-emerald-300",
        variant === "ghost" &&
          "border border-white/15 bg-white/5 text-white hover:bg-white/10",
        className,
      )}
      {...props}
    />
  );
}
