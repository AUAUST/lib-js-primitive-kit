/**
 * Is-not-string check. Shortcut for `typeof x !== "string"`.
 */
export function isNotString<const T>(value: T): value is Exclude<T, string> {
  return typeof value !== "string";
}
