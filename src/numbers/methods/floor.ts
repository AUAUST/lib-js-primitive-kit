import type { Numberifiable } from "~/numbers/types";
import { toNumber } from "./toNumber";

export function floor(num: Numberifiable): number {
  return Math.floor(toNumber(num));
}
