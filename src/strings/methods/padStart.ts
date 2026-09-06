import { defineMethod } from "~/compiler";
import type { Stringifiable } from "~/strings/types";
import { toString } from "./toString";

export default defineMethod({
  instanceCallable: "chainable",
});

/**
 * Pads the left side of a string with the specified characters,
 * or spaces by default, until the string reaches the specified length.
 */
export function padStart(
  str: Stringifiable,
  length: number,
  filler?: Stringifiable,
) {
  return toString(str).padStart(length, toString(filler) || " ");
}
