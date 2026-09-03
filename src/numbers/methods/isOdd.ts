import type { Numberifiable } from "~/numbers/types";
import { isInteger } from "./isInteger";
import { toNumber } from "./toNumber";

/** Returns a boolean whether the given integer is odd. */
export function isOdd(num: Numberifiable): num is number {
  const saneNum = toNumber(num);
  return isInteger(saneNum) && (saneNum & 1) === 1;
}
