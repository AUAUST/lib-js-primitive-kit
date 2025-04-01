import type { Stringifiable, ToString } from "~/strings/types";
import { toString } from "./toString";

export function repeat<T extends Stringifiable>(
  str: T,
  count: number
): `${string}${ToString<T>}${string}` {
  return <any>toString(str).repeat(count);
}
