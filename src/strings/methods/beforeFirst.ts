import type { Stringifiable, ToString } from "~/strings/types";
import { toString } from "./toString";

export type BeforeFirst<
  T extends Stringifiable,
  U extends Stringifiable
> = ToString<T> extends `${infer R}${ToString<U>}${string}` ? R : string;

export function beforeFirst<T extends Stringifiable, U extends Stringifiable>(
  str: T,
  substring: U
): BeforeFirst<T, U>;
export function beforeFirst(
  str: Stringifiable,
  substring: Stringifiable
): string;
export function beforeFirst(
  str: Stringifiable,
  substring: Stringifiable
): string {
  const s1 = toString(str);
  const s2 = toString(substring);
  const i = s1.indexOf(s2);

  if (i === -1) {
    return "";
  }

  return s1.slice(0, i);
}
