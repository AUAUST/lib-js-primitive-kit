/**
 * Returns a boolean whether the given input is a real number.
 * Only true for primitive numbers that are not `NaN` and are finite.
 */
export function isStrictNumber(num: unknown): num is number {
  return typeof num === "number" && isFinite(num); // isFinite() returns false for NaN too.
}
