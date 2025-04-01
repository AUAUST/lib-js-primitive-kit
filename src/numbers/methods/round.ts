import type { Numberifiable } from "~/numbers/types";
import { toNumber } from "./toNumber";

export function round(
  num: Numberifiable,
  precision: Numberifiable = 1
): number {
  const sanePrecision = toNumber(precision) || 1;
  return Math.round(toNumber(num) / sanePrecision) * sanePrecision;
}
