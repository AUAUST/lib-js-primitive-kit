import type { Stringifiable, ToString } from "~/strings/types";

export function toString<T extends Stringifiable | unknown>(
  str: T
): T extends Stringifiable ? ToString<T> : string {
  if (str === null || str === undefined) {
    return <any>"";
  }

  return <any>String(str);
}
