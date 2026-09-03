import type { Numberifiable } from "~/numbers/types";
import { toNumber } from "./toNumber";

/** Returns a string containing a number represented either in exponential or fixed-point notation with a specified number of digits. */
export function toPrecision(
  num: Numberifiable,
  precision?: Numberifiable,
): string {
  return toNumber(num).toPrecision(toNumber(precision));
}
