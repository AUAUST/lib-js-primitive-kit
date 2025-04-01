import type { Stringifiable, Uppercased } from "~/strings/types";
import { toString } from "./toString";

export function toUpperCase<T extends Stringifiable>(str: T): Uppercased<T> {
  return toString(str).toUpperCase() as Uppercased<T>;
}
