/** Is-not-boolean check. Shortcut for `typeof x !== "boolean"`. */
export function isNotBoolean<T>(value: T): value is Exclude<T, boolean> {
  return typeof value !== "boolean";
}
