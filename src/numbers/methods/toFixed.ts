import type { Numberifiable } from "~/numbers/types";
import { toNumber } from "./toNumber";

/** Returns a string representing a number in fixed-point notation. */
export function toFixed(
  num: Numberifiable,
  fractionDigits?: Numberifiable,
): string {
  return toNumber(num).toFixed(toNumber(fractionDigits));
}
