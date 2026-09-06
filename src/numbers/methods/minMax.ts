import type { Numberifiable } from "~/numbers/types";
import { toNumber } from "./toNumber";

/**
 * Returns a tuple of the minimum and maximum values from the provided numbers.
 */
export function minMax(...nums: Numberifiable[]): [min: number, max: number] {
  nums = nums.map(toNumber);

  return [Math.min(...(<number[]>nums)), Math.max(...(<number[]>nums))];
}
