import { defineMethod } from "~/compiler";
import type { Numberifiable } from "~/numbers/types";
import { type ToNumber, toNumber } from "./toNumber";

export default defineMethod({
  instanceCallable: "chainable",
});

/**
 * Returns the maximum value from the provided numbers.
 */
export function max<T extends Numberifiable, Ns extends Numberifiable[]>(
  num: T,
  ...nums: Ns
): ToNumber<Ns[number]>;
export function max(num: Numberifiable, ...nums: Numberifiable[]): number {
  return Math.max(toNumber(num), ...nums.map(toNumber));
}
