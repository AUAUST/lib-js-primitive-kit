import type { Stringifiable, ToString } from "~/strings/types";

export function toString<T extends Stringifiable>(str: T): ToString<T>;
export function toString(str?: unknown): string;
export function toString(str: unknown): string {
  if (str === null || str === undefined) {
    return "";
  }

  return String(str);
}
