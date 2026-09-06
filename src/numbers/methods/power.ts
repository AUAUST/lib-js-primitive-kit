import { defineMethod } from "~/compiler";
import type { Numberifiable } from "~/numbers/types";
import { toNumber } from "./toNumber";

export default defineMethod({
  instanceCallable: "chainable",
});

/**
 * Returns the number raised to the power of the exponent.
 */
export function power(base: Numberifiable, exponent: Numberifiable): number {
  return toNumber(base) ** toNumber(exponent);
}
