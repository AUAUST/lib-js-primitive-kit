import { defineMethod } from "~/compiler";
import type { Numberifiable } from "~/numbers/types";
import { toNumber } from "./toNumber";

export default defineMethod({
  instanceCallable: true,
});

/**
 * Returns a string containing a number represented either in exponential or fixed-point notation with a specified number of digits.
 */
export function toPrecision(
  num: Numberifiable,
  precision?: Numberifiable,
): string {
  return toNumber(num).toPrecision(toNumber(precision));
}
