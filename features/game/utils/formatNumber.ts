export function formatNumber(value: number) {
  if (value < 1000) {
    return Math.floor(value).toString();
  }

  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}
