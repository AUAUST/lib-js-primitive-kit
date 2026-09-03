import type { Booleanifiable } from "~/booleans/types";

/**
 * A loose is-boolean check. Returns `true` for any value that directly represents a boolean.
 *
 * Returns `true` for booleans, strings that case-insensitively match `"`true`"` or `"`false`"`,
 * numbers that are `0` or `1` and for objects which `valueOf()` method returns one of the above.
 * Returns ``false` for any other value.
 */
export function isLooseBoolean(x: any): x is Booleanifiable {
  x = x?.valueOf();

  switch (typeof x) {
    case "boolean":
      return true;
    case "string":
      x = x.trim().toLowerCase();
      return x === "true" || x === "false";
    case "number":
      return x === 0 || x === 1;
  }

  return false;
}
