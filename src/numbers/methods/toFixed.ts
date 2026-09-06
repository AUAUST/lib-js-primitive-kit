import { defineMethod } from "~/compiler";
import type { Numberifiable } from "~/numbers/types";
import { toNumber } from "./toNumber";

export default defineMethod({
  instanceCallable: true,
});

/**
 * Returns a string representing a number in fixed-point notation.
 */
export function toFixed(
  num: Numberifiable,
  fractionDigits?: Numberifiable,
): string {
  return toNumber(num).toFixed(toNumber(fractionDigits));
}
