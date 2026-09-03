/**
 * Simple is-object check. Returns `true` for any object, including arrays and functions.
 *
 * If you need to check whether a value is a plain object, excluding functions and optionally arrays, use `O.is(value)` instead.
 */
export function isObject(input: any): input is object {
  return !!input && (typeof input === "object" || typeof input === "function");
}
