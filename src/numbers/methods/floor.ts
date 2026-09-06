import { defineMethod } from "~/compiler";
import type { Numberifiable } from "~/numbers/types";
import { toNumber } from "./toNumber";

export default defineMethod({
  instanceCallable: "chainable",
});

/**
 * Floors a number.
 */
export function floor(num: Numberifiable): number {
  return Math.floor(toNumber(num));
}
