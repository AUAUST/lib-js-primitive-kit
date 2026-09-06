import { defineMethod } from "~/compiler";
import type { Numberifiable } from "~/numbers/types";
import { toNumber } from "./toNumber";

export default defineMethod({
  instanceCallable: true,
});

/**
 * Checks whether a number is an integer.
 */
export function isInteger(num: Numberifiable): boolean {
  return Number.isInteger(toNumber(num));
}
