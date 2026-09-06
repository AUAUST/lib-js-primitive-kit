import type { Numberifiable } from "~/numbers/types";
import { toNumber } from "./toNumber";

/**
 * Checks whether a number is negative.
 */
export function isNegative(num: Numberifiable): boolean {
  return toNumber(num) < 0;
}
