import type { Numberifiable } from "~/numbers/types";
import { toNumber } from "./toNumber";

/**
 * Rounds a number to the nearest integer or to the specified precision.
 * The precision represents the "increment" to round to.
 * For exemple, a precision of `0.5` will round to the nearest half-integer while `5` will round to the nearest multiple of 5.
 */
export function round(
  num: Numberifiable,
  precision: Numberifiable = 1,
): number {
  const sanePrecision = toNumber(precision) || 1;
  return Math.round(toNumber(num) / sanePrecision) * sanePrecision;
}
