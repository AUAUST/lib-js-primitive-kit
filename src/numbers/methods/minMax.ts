import type { Numberifiable } from "~/numbers/types";
import { toNumber } from "./toNumber";

export function minMax(...nums: Numberifiable[]): [min: number, max: number] {
  nums = nums.map(toNumber);

  return [Math.min(...(<number[]>nums)), Math.max(...(<number[]>nums))];
}
