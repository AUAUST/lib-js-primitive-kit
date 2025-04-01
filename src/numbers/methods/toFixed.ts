import type { Numberifiable } from "~/numbers/types";
import { toNumber } from "./toNumber";

export function toFixed(
  num: Numberifiable,
  fractionDigits?: Numberifiable
): string {
  return toNumber(num).toFixed(toNumber(fractionDigits));
}
