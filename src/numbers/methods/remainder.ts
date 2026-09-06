import { defineMethod } from "~/compiler";
import type { Numberifiable } from "~/numbers/types";
import { toNumber } from "./toNumber";

export default defineMethod({
  instanceCallable: "chainable",
});

/**
 * Returns the remainder of the first number divided by the second number.*
 * `1` is used as the default divisor, allowing to extract the decimal part of a number.
 */
export function remainder(
  num: Numberifiable,
  divisor: Numberifiable = 1,
): number {
  return toNumber(num) % toNumber(divisor);
}
