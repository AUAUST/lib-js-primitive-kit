import type { Numberifiable } from "~/numbers/types";
import { isInteger } from "./isInteger";
import { toNumber } from "./toNumber";

/** Returns a boolean whether the given integer is even. */
export function isEven(num: Numberifiable): num is number {
  return isInteger(num) && (toNumber(num) & 1) === 0;
}
