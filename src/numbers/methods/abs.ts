import { defineMethod } from "~/compiler";
import type { Numberifiable } from "~/numbers/types";
import { toNumber } from "./toNumber";

export default defineMethod({
  instanceCallable: "chainable",
});

/**
 * Returns the absolute value of a number . For example, the absolute value of -5 is the same as the absolute value of 5.
 */
export function abs(num: Numberifiable): number {
  return Math.abs(toNumber(num));
}
