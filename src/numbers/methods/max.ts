import { defineMethod } from "~/compiler";
import type { Numberifiable, ToNumber } from "~/numbers/types";
import { toNumber } from "./toNumber";

export default defineMethod({
  instanceCallable: "chainable",
});

/**
 * Returns the maximum value from the provided numbers.
 */
export function max<
  const T extends Numberifiable,
  const Ns extends Numberifiable[],
>(
  num: T,
  ...nums: Ns
): ToNumber<Ns[number]>;
export function max(num: Numberifiable, ...nums: Numberifiable[]): number {
  return Math.max(toNumber(num), ...nums.map(toNumber));
}
