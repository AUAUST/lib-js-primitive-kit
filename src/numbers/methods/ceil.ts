import type { Numberifiable } from "~/numbers/types";
import { toNumber } from "./toNumber";

export function ceil(num: Numberifiable): number {
  return Math.ceil(toNumber(num));
}
