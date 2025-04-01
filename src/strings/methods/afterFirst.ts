import type { Stringifiable, ToString } from "~/strings/types";
import { toString } from "./toString";

export type AfterFirst<
  T extends Stringifiable,
  U extends Stringifiable
> = ToString<T> extends `${string}${ToString<U>}${infer R}` ? R : string;

export function afterFirst<T extends Stringifiable, U extends Stringifiable>(
  str: T,
  substring: U
): AfterFirst<T, U> {
  const s1 = toString(str);
  const s2 = toString(substring);
  const i = s1.indexOf(s2);

  if (i === -1) {
    return <any>"";
  }

  return <any>s1.slice(i + s2.length);
}
