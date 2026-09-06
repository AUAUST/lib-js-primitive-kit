import { defineMethod } from "~/compiler";
import type { Numberifiable } from "~/numbers/types";
import { toNumber } from "./toNumber";

export default defineMethod({
  instanceCallable: true,
});

/**
 * Returns a string containing a number represented in exponential notation.
 */
export function toExponential(
  num: Numberifiable,
  fractionDigits?: Numberifiable,
): string {
  return toNumber(num).toExponential(toNumber(fractionDigits));
}
