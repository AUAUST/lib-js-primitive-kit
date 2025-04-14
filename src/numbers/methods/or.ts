import type { Numberifiable } from "~/numbers/types";
import { toNumber } from "./toNumber";

export function or(...args: Numberifiable[]): number {
  for (let arg of args) if (!isNaN((arg = toNumber(arg)))) return <number>arg;
  return NaN;
}
