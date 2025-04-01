import type { Numberifiable } from "~/numbers/types";
import { toNumber } from "./toNumber";

export function hasDecimal(num: Numberifiable): boolean {
  return !Number.isInteger(toNumber(num));
}
