/**
 * Returns a boolean whether the given input is a property key.
 * It aligns with TypeScript's `PropertyKey` type.
 * Returns `true` for strings, numbers, and symbols.
 * Returns `false` for any other value.
 */
export function isPropertyKey(input: any): input is PropertyKey {
  switch (typeof input) {
    case "string":
    case "number":
    case "symbol":
      return true;
    default:
      return false;
  }
}
