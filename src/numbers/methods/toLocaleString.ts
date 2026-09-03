import type { Numberifiable } from "~/numbers/types";
import { toNumber } from "./toNumber";

/** Returns a string with a language sensitive representation of this number. */
export function toLocaleString(
  num: Numberifiable,
  ...args: Parameters<Number["toLocaleString"]>
): string {
  return toNumber(num).toLocaleString(...args);
}
