/**
 * Shorthand for `!Array.isArray()`.
 */
export function isNotArray<T>(value: T): value is Exclude<T, any[]> {
  return !Array.isArray(value);
}
