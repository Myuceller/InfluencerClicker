export function formatNumber(value: number) {
  if (value < 1_000) {
    return Math.floor(value).toString();
  }

  if (value < 1_000_000) {
    return Math.floor(value).toLocaleString("en-US");
  }

  const units = [
    { value: 1_000_000_000_000_000_000, suffix: "Qi" },
    { value: 1_000_000_000_000_000, suffix: "Qa" },
    { value: 1_000_000_000_000, suffix: "T" },
    { value: 1_000_000_000, suffix: "B" },
    { value: 1_000_000, suffix: "M" },
  ];
  const unit = units.find((item) => value >= item.value);

  if (!unit) {
    return Math.floor(value).toLocaleString("en-US");
  }

  const compactValue = value / unit.value;
  const formatted = compactValue.toLocaleString("en-US", {
    maximumFractionDigits: compactValue >= 10 ? 0 : 1,
  });

  return `${formatted}${unit.suffix}`;
}
