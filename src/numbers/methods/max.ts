import type { Numberifiable } from "~/numbers/types";
import { type ToNumber, toNumber } from "./toNumber";

export function max<Ns extends Numberifiable[]>(
  ...nums: Ns
): ToNumber<Ns[number]>;
export function max(...nums: Numberifiable[]): number {
  return Math.max(...nums.map(toNumber));
}
