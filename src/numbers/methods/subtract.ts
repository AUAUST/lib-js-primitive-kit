import { defineMethod } from "~/compiler";
import type { Numberifiable } from "~/numbers/types";
import { toNumber } from "./toNumber";

export default defineMethod({
  instanceCallable: "chainable",
});

/**
 * Returns the first number subtracted by the following numbers.
 */
export function subtract(num: Numberifiable, ...nums: Numberifiable[]): number {
  return nums.reduce<number>((acc, n) => acc - toNumber(n), toNumber(num));
}
