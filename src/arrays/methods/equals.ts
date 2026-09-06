import { defineMethod } from "~/compiler";
import type { WritableRecursive } from "~/objects/types";
import { isArray } from "./isArray";

export default defineMethod({
  instanceCallable: true,
});

/**
 * Compare two arrays for equality.
 * If `recursive` is true, nested arrays will be compared as well.
 * Non-array objects are compared using `Object.is()`.
 */
export function equals<T extends readonly any[]>(
  a: T,
  b: unknown,
  recursive = false,
): b is WritableRecursive<T> {
  if (Object.is(a, b)) {
    return true;
  }

  if (!isArray(a) || !isArray(b)) {
    return false;
  }

  if (a.length !== b.length) {
    return false;
  }

  if (!recursive) {
    return a.every((v, i) => v === b[i]);
  }

  return a.every((v, i) => {
    const r = b[i];

    if (isArray(v)) return isArray(r) && equals(v, r, true);

    return v === r;
  });
}
