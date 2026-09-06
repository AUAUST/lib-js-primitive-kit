import { defineMethod } from "~/compiler";
import type { Numberifiable } from "~/numbers/types";
import { toNumber } from "./toNumber";

export default defineMethod({
  instanceCallable: true,
});

/**
 * Checks whether a number is positive.
 */
export function isPositive(num: Numberifiable): boolean {
  return toNumber(num) > 0;
}
