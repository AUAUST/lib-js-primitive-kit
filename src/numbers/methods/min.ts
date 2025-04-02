import type { Numberifiable } from "~/numbers/types";
import { type ToNumber, toNumber } from "./toNumber";

export function min<Ns extends Numberifiable[]>(
  ...nums: Ns
): ToNumber<Ns[number]> {
  return Math.min(...nums.map(toNumber)) as ToNumber<Ns[number]>;
}
