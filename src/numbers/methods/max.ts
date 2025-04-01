import type { Numberifiable, ToNumber } from "~/numbers/types";
import { toNumber } from "./toNumber";

export function max<Ns extends Numberifiable[]>(
  ...nums: Ns
): ToNumber<Ns[number]> {
  return Math.max(...nums.map(toNumber)) as ToNumber<Ns[number]>;
}
