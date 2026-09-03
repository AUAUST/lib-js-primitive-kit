import type { Numberifiable } from "~/numbers/types";
import { toNumber } from "./toNumber";

/** Returns the absolute value of a number . For example, the absolute value of -5 is the same as the absolute value of 5. */
export function abs(num: Numberifiable): number {
  return Math.abs(toNumber(num));
}
