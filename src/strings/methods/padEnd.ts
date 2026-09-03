import type { Stringifiable } from "~/strings/types";
import { toString } from "./toString";

/**
 * Pads the right side of a string with the specified characters,
 * or spaces by default, until the string reaches the specified length.
 */
export function padEnd(
  str: Stringifiable,
  length: number,
  filler?: Stringifiable,
) {
  return toString(str).padEnd(length, toString(filler) || " ");
}
