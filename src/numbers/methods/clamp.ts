import type { Numberifiable } from "~/numbers/types";
import { toNumber } from "./toNumber";

/** Clamps a number between a minimum and a maximum. */
export function clamp(
  num: Numberifiable,
  min: Numberifiable,
  max: Numberifiable,
): number {
  return Math.min(Math.max(toNumber(num), toNumber(min)), toNumber(max));
}
