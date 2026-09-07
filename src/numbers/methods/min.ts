import { defineMethod } from "~/compiler";
import type { Numberifiable, ToNumber } from "~/numbers/types";
import { toNumber } from "./toNumber";

export default defineMethod({
  instanceCallable: "chainable",
});

/**
 * Returns the minimum value from the provided numbers.
 */
export function min<
  const T extends Numberifiable,
  const Ns extends Numberifiable[],
>(
  num: T,
  ...nums: Ns
): ToNumber<Ns[number]>;
export function min(num: Numberifiable, ...nums: Numberifiable[]): number {
  return Math.min(toNumber(num), ...nums.map(toNumber));
}
