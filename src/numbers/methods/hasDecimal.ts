import type { Numberifiable } from "~/numbers/types";
import { toNumber } from "./toNumber";

/**
 * Checks whether has a decimal part.
 */
export function hasDecimal(num: Numberifiable): boolean {
  return !Number.isInteger(toNumber(num));
}
