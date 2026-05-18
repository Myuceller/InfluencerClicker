import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
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
        variant === "ghost" &&
          "border border-white/15 bg-white/5 text-white hover:bg-white/10",
        className,
      )}
      {...props}
    />
  );
}
