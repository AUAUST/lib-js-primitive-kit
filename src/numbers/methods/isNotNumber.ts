export function isNotNumber<T>(value: T): value is Exclude<T, number> {
  return typeof value !== "number" || Number.isNaN(value);
}
