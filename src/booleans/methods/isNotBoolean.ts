export function isNotBoolean<T>(value: T): value is Exclude<T, boolean> {
  return typeof value !== "boolean";
}
