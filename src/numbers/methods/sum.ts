import { defineMethod } from "~/compiler";
import type { Numberifiable } from "~/numbers/types";
import { toNumber } from "./toNumber";

export default defineMethod({
  instanceCallable: "chainable",
});

/**
 * Returns the sum of all the provided numbers.
 */
export function sum(...nums: Numberifiable[]): number {
  return nums.reduce<number>((acc, num) => acc + toNumber(num), 0);
}
