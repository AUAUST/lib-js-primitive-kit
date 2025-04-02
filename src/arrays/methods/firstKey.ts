import { ExpectedArrayError } from "~/arrays/helpers";
import type { ArrayKey } from "~/arrays/types";
import { isArray } from "./isArray";

export function firstKey<T extends readonly any[]>(arr: T): ArrayKey<T> {
  if (!isArray(arr)) {
    throw new ExpectedArrayError();
  }
  let key: ArrayKey<T>;

  arr.some((_, k) => ((key = <any>k), true));

  return key!;
}
