import { defineMethod } from "~/compiler";
import type { Numberifiable } from "~/numbers/types";
import { toNumber } from "./toNumber";

export default defineMethod({
  instanceCallable: true,
});

/**
 * Checks whether a number is negative.
 */
export function isNegative(num: Numberifiable): boolean {
  return toNumber(num) < 0;
}
