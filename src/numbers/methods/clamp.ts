import type { Numberifiable } from "~/numbers/types";
import { toNumber } from "./toNumber";

export function clamp(
  num: Numberifiable,
  min: Numberifiable,
  max: Numberifiable
): number {
  return Math.min(Math.max(toNumber(num), toNumber(min)), toNumber(max));
}
