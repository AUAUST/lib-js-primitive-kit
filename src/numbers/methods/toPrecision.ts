import type { Numberifiable } from "~/numbers/types";
import { toNumber } from "./toNumber";

export function toPrecision(
  num: Numberifiable,
  precision?: Numberifiable
): string {
  return toNumber(num).toPrecision(toNumber(precision));
}
