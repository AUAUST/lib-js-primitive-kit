import { defineMethod } from "~/compiler";
import type { Numberifiable } from "~/numbers/types";
import { sum } from "./sum";

export default defineMethod({
  instanceCallable: "chainable",
});

/**
 * Returns the average of all the provided numbers. Done by summing all the numbers and dividing by the count.
 */
export function average(...nums: Numberifiable[]): number {
  return sum(...nums) / nums.length;
}
