import type { Stringifiable, ToString } from "~/strings/types";
import type { AfterFirst } from "./afterFirst";
import type { BeforeFirst } from "./beforeFirst";
import { toString } from "./toString";

type SplitFirst<
  T extends Stringifiable,
  U extends Stringifiable
> = ToString<T> extends `${string}${ToString<U>}${string}`
  ? [BeforeFirst<T, U>, AfterFirst<T, U>]
  : [T, ""];

export function splitFirst<T extends Stringifiable, U extends Stringifiable>(
  str: Stringifiable,
  separator: Stringifiable
): SplitFirst<T, U>;
export function splitFirst(
  str: Stringifiable,
  separator: Stringifiable
): [string, string] {
  const s1 = toString(str);
  const s2 = toString(separator);
  const i = s1.indexOf(s2);

  if (i === -1) {
    return [s1, ""];
  }

  return [s1.slice(0, i), s1.slice(i + s2.length)];
}
