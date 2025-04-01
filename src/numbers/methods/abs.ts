import type { Numberifiable } from "~/numbers/types";
import { toNumber } from "./toNumber";

export function abs(num: Numberifiable): number {
  return Math.abs(toNumber(num));
}
