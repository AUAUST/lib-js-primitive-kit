import type { Numberifiable } from "~/numbers/types";
import { toNumber } from "./toNumber";

export function numberToString(
  num: Numberifiable,
  radix?: Numberifiable
): string {
  return toNumber(num).toString(toNumber(radix));
}
