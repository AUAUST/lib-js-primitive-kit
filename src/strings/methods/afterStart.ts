import type { Stringifiable, ToString } from "~/strings/types";
import { toString } from "./toString";

type AfterStart<
  T extends Stringifiable,
  U extends Stringifiable
> = ToString<T> extends `${ToString<U>}${infer R}` ? R : string;

export function afterStart<T extends Stringifiable, U extends Stringifiable>(
  str: T,
  substring: U
): AfterStart<T, U>;
export function afterStart(
  str: Stringifiable,
  substring: Stringifiable
): string;
export function afterStart(
  str: Stringifiable,
  substring: Stringifiable
): string {
  const s1 = toString(str);
  const s2 = toString(substring);

  if (!s1.startsWith(s2)) {
    return "";
  }

  return s1.slice(s2.length);
}
