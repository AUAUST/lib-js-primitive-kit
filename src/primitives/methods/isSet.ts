/**
 * Returns a boolean whether the given input is set.
 *
 * As a helper, it also checks against the string "undefined".
 * It allows for use as `P.isSet(typeof x)`, which is more concise than `typeof x !== "undefined"` when checking whether a variable is defined.
 *
 * ```ts
 * const isBrowser = P.isSet(typeof window);
 * ```
 */
export function isSet<const T>(input: T): input is NonNullable<T> {
  return input !== null && input !== undefined && input !== "undefined";
}
