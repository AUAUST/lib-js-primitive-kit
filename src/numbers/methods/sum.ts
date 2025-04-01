import type { Numberifiable } from "~/numbers/types";
import { toNumber } from "./toNumber";

export function sum(...nums: Numberifiable[]): number {
  return nums.reduce<number>((acc, num) => acc + toNumber(num), 0);
}
