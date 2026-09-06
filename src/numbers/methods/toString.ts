import { defineMethod } from "~/compiler";
import type { Numberifiable } from "~/numbers/types";
import { toNumber } from "./toNumber";

export default defineMethod({
  helperAliases: ["numberToString"],
  instanceCallable: true,
});

/**
 * Returns a string representation of a number.
 */
export function toString(
  num: Numberifiable,
  radix: Numberifiable = 10,
): string {
  return toNumber(num).toString(toNumber(radix));
}
