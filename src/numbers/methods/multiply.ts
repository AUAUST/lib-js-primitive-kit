import type { Numberifiable } from "~/numbers/types";
import { toNumber } from "./toNumber";

/** Returns the product of all the provided numbers. */
export function multiply(...nums: Numberifiable[]): number {
  return nums.reduce<number>((acc, num) => acc * toNumber(num), 1);
}
