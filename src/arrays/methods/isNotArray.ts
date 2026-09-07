/**
 * Shorthand for `!Array.isArray()`.
 */
export function isNotArray<const T>(value: T): value is Exclude<T, any[]> {
  return !Array.isArray(value);
}
