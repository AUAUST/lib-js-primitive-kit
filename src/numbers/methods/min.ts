import { defineMethod } from "~/compiler";
import type { Numberifiable } from "~/numbers/types";
import { type ToNumber, toNumber } from "./toNumber";

export default defineMethod({
  instanceCallable: "chainable",
});

/**
 * Returns the minimum value from the provided numbers.
 */
export function min<T extends Numberifiable, Ns extends Numberifiable[]>(
  num: T,
  ...nums: Ns
): ToNumber<Ns[number]>;
export function min(num: Numberifiable, ...nums: Numberifiable[]): number {
  return Math.min(toNumber(num), ...nums.map(toNumber));
}
