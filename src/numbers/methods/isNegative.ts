import type { Numberifiable } from "~/numbers/types";
import { toNumber } from "./toNumber";

export function isNegative(num: Numberifiable): boolean {
  return toNumber(num) < 0;
}
