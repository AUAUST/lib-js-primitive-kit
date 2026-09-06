import type { Numberifiable } from "~/numbers/types";
import { toNumber } from "./toNumber";

/**
 * Returns a string representation of a number.
 */
export function numberToString(
  num: Numberifiable,
  radix: Numberifiable = 10,
): string {
  return toNumber(num).toString(toNumber(radix));
}
