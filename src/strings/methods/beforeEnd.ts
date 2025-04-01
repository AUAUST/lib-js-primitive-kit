import type { Stringifiable, ToString } from "~/strings/types";
import { toString } from "./toString";

type BeforeEnd<
  T extends Stringifiable,
  U extends Stringifiable
> = ToString<T> extends `${infer R}${ToString<U>}` ? R : string;

export function beforeEnd<T extends Stringifiable, U extends Stringifiable>(
  str: T,
  substring: U
): BeforeEnd<T, U> {
  const s1 = toString(str);
  const s2 = toString(substring);

  if (!s1.endsWith(s2)) {
    return <any>"";
  }

  return <any>s1.slice(0, s1.length - s2.length);
}
