import type { Numberifiable } from "~/numbers/types";
import { toNumber } from "./toNumber";

/**
 * Returns a boolean whether the given integer is a multiple of another integer.
 */
export function isMultipleOf(
  num: Numberifiable,
  multiple: Numberifiable,
): num is number {
  return toNumber(num) % toNumber(multiple) === 0;
}
