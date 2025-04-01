import type { Numberifiable } from "~/numbers/types";
import { toNumber } from "./toNumber";

export function toExponential(
  num: Numberifiable,
  fractionDigits?: Numberifiable
): string {
  return toNumber(num).toExponential(toNumber(fractionDigits));
}
