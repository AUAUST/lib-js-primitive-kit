import type { ArrayKey } from "~/arrays/types";
import { isArray } from "./isArray";

export function lastKey<T extends readonly any[]>(arr: T): ArrayKey<T> {
  if (!isArray(arr)) {
    throw new TypeError("lastKey called on non-array");
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    if (i in arr) {
      return <ArrayKey<T>>i;
    }
  }

  return undefined!;
}
