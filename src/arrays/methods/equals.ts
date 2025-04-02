import type { Writable } from "~/objects/types";
import { isArray } from "./isArray";

export function equals<T extends readonly any[]>(
  a: T,
  b: unknown,
  recursive = false
): b is Writable<T> {
  if (!isArray(a) || !isArray(b)) {
    return false;
  }

  if (Object.is(a, b)) {
    return true;
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
