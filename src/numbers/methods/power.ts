import type { Numberifiable } from "~/numbers/types";
import { toNumber } from "./toNumber";

export function power(base: Numberifiable, exponent: Numberifiable): number {
  return toNumber(base) ** toNumber(exponent);
}
