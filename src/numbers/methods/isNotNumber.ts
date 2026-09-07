/**
 * Is-not-number check. Returns `true` for any value that is not a number, including `NaN`.
 */
export function isNotNumber<const T>(value: T): value is Exclude<T, number> {
  return typeof value !== "number" || Number.isNaN(value);
}
