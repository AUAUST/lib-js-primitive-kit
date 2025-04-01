import type { Lowercased, Stringifiable } from "~/strings/types";
import { toString } from "./toString";

export function toLowerCase<T extends Stringifiable>(str: T): Lowercased<T> {
  return toString(str).toLowerCase() as Lowercased<T>;
}
