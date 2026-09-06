import type { Numberifiable } from "~/numbers/types";
import { toNumber } from "./toNumber";

/**
 * Ceils a number.
 */
export function ceil(num: Numberifiable): number {
  return Math.ceil(toNumber(num));
}
