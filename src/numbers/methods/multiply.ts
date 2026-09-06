import { defineMethod } from "~/compiler";
import type { Numberifiable } from "~/numbers/types";
import { toNumber } from "./toNumber";

export default defineMethod({
  instanceCallable: "chainable",
});

/**
 * Returns the product of all the provided numbers.
 */
export function multiply(...nums: Numberifiable[]): number {
  return nums.reduce<number>((acc, num) => acc * toNumber(num), 1);
}
