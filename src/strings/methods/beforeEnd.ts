import type { Stringifiable, ToString } from "~/strings/types";
import { toString } from "./toString";

type BeforeEnd<
  T extends Stringifiable,
  U extends Stringifiable
> = ToString<T> extends `${infer R}${ToString<U>}` ? R : string;

export function beforeEnd<T extends Stringifiable, U extends Stringifiable>(
  str: T,
  substring: U
): BeforeEnd<T, U>;
export function beforeEnd(str: Stringifiable, substring: Stringifiable): string;
export function beforeEnd(
  str: Stringifiable,
  substring: Stringifiable
): string {
  const s1 = toString(str);
  const s2 = toString(substring);

  if (!s1.endsWith(s2)) {
    return "";
  }

  return s1.slice(0, s1.length - s2.length);
}
