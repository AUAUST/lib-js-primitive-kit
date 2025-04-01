import type { Numberifiable } from "~/numbers/types";
import { toNumber } from "./toNumber";

export function isPositive(num: Numberifiable): boolean {
  return toNumber(num) > 0;
}
