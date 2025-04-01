import type { Stringifiable, ToString } from "~/strings/types";
import { toString } from "./toString";

type Split<S extends string, D extends string> = string extends S
  ? string[]
  : S extends ""
  ? []
  : S extends `${infer T}${D}${infer U}`
  ? [T, ...Split<U, D>]
  : [S];

export function split<S extends Stringifiable, D extends Stringifiable>(
  str: S,
  separator?: D,
  limit?: number
): Split<ToString<S>, ToString<D>> {
  const s1 = toString(str);

  if (limit === 1) {
    return <any>[s1];
  }

  const s2 = toString(separator);

  if (!limit || limit < 0) {
    return <any>s1.split(s2);
  }

  // We use a custom implementation to handle limits, because the native split
  // "splits everything and trim to the limit", which means we lose the last part of our string.
  // i.e., "a,b,c,d".split(",", 2) => ["a", "b"], where we want ["a", "b,c,d"].

  const parts = s1.split(s2);

  if (parts.length <= limit) {
    return <any>parts;
  }

  const overflow = parts.slice(limit - 1).join(s2);

  parts.length = limit - 1;
  parts.push(overflow);

  return <any>parts;
}
