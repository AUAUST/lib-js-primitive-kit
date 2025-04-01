import type { Stringifiable } from "~/strings/types";
import { toString } from "./toString";

export function padStart(
  str: Stringifiable,
  length: number,
  filler?: Stringifiable
) {
  return toString(str).padStart(length, toString(filler) || " ");
}
