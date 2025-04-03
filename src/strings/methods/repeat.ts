import type { Stringifiable, ToString } from "~/strings/types";
import { toString } from "./toString";

export function repeat<T extends Stringifiable>(
  str: T,
  count: number
): `${string}${ToString<T>}${string}`;
export function repeat(str: Stringifiable, count: number): string;
export function repeat(str: Stringifiable, count: number): string {
  return toString(str).repeat(count);
}
