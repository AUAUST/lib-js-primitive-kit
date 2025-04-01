import type { Numberifiable } from "~/numbers/types";
import { toNumber } from "./toNumber";

export function subtract(num: Numberifiable, ...nums: Numberifiable[]): number {
  return nums.reduce<number>((acc, n) => acc - toNumber(n), toNumber(num));
}
