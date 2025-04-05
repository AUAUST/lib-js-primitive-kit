import type { Stringifiable, ToString } from "~/strings/types";
import { toString } from "./toString";

export function capitalize<T extends Stringifiable>(
  str: T
): Capitalize<ToString<T>>;
export function capitalize(str: unknown): Capitalize<string>;
export function capitalize(str: unknown): string {
  const s = toString(str);
  return s.charAt(0).toUpperCase() + s.slice(1);
}
