const naturalCollator = new Intl.Collator("en", {
  numeric: true,
  sensitivity: "base",
});

export function compareNaturally(left: string, right: string): number {
  return (
    naturalCollator.compare(left, right) ||
    left.localeCompare(right, "en", { numeric: true })
  );
}
