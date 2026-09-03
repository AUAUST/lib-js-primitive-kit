import type { Numberifiable } from "~/numbers/types";
import { toNumber } from "./toNumber";

/** Returns the quotient of the first number divided by the following numbers. */
export function divide(num: Numberifiable, ...nums: Numberifiable[]): number {
  return nums.reduce<number>((acc, n) => acc / toNumber(n), toNumber(num));
}
