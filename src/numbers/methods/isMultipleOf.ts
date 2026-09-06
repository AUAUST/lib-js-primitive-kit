import { defineMethod } from "~/compiler";
import type { Numberifiable } from "~/numbers/types";
import { toNumber } from "./toNumber";

export default defineMethod({
  instanceCallable: true,
});

/**
 * Returns a boolean whether the given integer is a multiple of another integer.
 */
export function isMultipleOf(
  num: Numberifiable,
  multiple: Numberifiable,
): num is number {
  return toNumber(num) % toNumber(multiple) === 0;
}
