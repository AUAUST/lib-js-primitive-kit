import { defineMethod } from "~/compiler";
import type { Numberifiable } from "~/numbers/types";
import { toNumber } from "./toNumber";

export default defineMethod({
  instanceCallable: true,
});

/**
 * Returns a string with a language sensitive representation of this number.
 */
export function toLocaleString(
  num: Numberifiable,
  ...args: Parameters<Number["toLocaleString"]>
): string {
  return toNumber(num).toLocaleString(...args);
}
