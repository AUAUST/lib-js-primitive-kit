import type { Numberifiable } from "~/numbers/types";
import { toNumber } from "./toNumber";

export function remainder(
  num: Numberifiable,
  divisor: Numberifiable = 1
): number {
  return toNumber(num) % toNumber(divisor);
}
