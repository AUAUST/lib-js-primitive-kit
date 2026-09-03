/**
 * A strict is-string check.
 * Returns true only for primitive strings, which length is greater than 0.
 */
export function isStrictString(x: any): x is string {
  return typeof x === "string" && x !== "";
}
