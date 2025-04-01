import type { Numberifiable } from "~/numbers/types";
import { toNumber } from "./toNumber";

export function randomFloat(
  min: Numberifiable = 0,
  max: Numberifiable = 1
): number {
  const saneMin = toNumber(min);
  return Math.random() * (toNumber(max) - saneMin) + saneMin;
}
