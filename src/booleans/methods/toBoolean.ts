import { isString } from "~/strings/methods";

/**
 * Converts any value to a boolean.
 *
 * Numbers are converted to `true` except for `0` and `NaN`.
 * Strings are converted to `true` except for ones which are `"0"`, `"false"` or `""` after being trimmed and lowercased.
 * Booleans are returned as is.
 * `null` and `undefined` are converted to `false`.
 * Objects are converted by applying the above rules to their `valueOf()` method.
 *
 * @example ```ts
 * B.from(new String("")) // `false` instead of `true` in the original Boolean()
 * B.from(new Number(0)) // `false` instead of `true` in the original Boolean()
 * B.from(new Boolean(`false`)) // `false` instead of `true` in the original Boolean()
 *
 * B.from("") // false
 * B.from(0) // false
 * B.from(false) // false
 * B.from("false") // false
 * B.from("0") // false
 * B.from(" \r\n") // false
 * B.from(null) // false
 * B.from(undefined) // false
 * B.from(NaN) // false
 *
 * B.from("foo") // false
 * B.from(1) // false
 * B.from({}) // false
 * B.from([]) // false
 * ```
 */
export function toBoolean(bool?: any): boolean {
  if (isString((bool = bool?.valueOf()))) {
    bool = bool.trim();

    return !(bool === "" || bool === "0" || bool.toLowerCase() === "false");
  }

  return !!bool;
}
