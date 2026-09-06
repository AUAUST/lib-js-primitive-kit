import type { Numberifiable } from "~/numbers/types";
import { toNumber } from "./toNumber";

/**
 * Returns the first non-`NaN` value from the provided numbers.
 */
export function or(...args: Numberifiable[]): number {
  for (let arg of args) if (!isNaN((arg = toNumber(arg)))) return <number>arg;
  return NaN;
}
