import type { Stringifiable, ToString } from "~/strings/types";
import { toString } from "./toString";

export function decapitalize<T extends Stringifiable>(
  str: T
): Uncapitalize<ToString<T>>;
export function decapitalize(str: unknown): Uncapitalize<string>;
export function decapitalize(str: unknown): string {
  const s = toString(str);
  return s.charAt(0).toLowerCase() + s.slice(1);
}
