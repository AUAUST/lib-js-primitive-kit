import type { Numberifiable } from "~/numbers/types";
import { toNumber } from "./toNumber";

/** Floors a number. */
export function floor(num: Numberifiable): number {
  return Math.floor(toNumber(num));
}
