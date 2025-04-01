import type { Stringifiable } from "~/strings/types";
import { toString } from "./toString";

export function padEnd(
  str: Stringifiable,
  length: number,
  filler?: Stringifiable
) {
  return toString(str).padEnd(length, toString(filler) || " ");
}
