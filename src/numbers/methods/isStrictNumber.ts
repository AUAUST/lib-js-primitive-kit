export function isStrictNumber(num: unknown): num is number {
  return typeof num === "number" && isFinite(num); // isFinite() returns false for NaN too.
}
