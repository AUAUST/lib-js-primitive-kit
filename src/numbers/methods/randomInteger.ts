import type { Numberifiable } from "~/numbers/types";
import { toNumber } from "./toNumber";

export function randomInteger(
  min: Numberifiable = 0,
  max: Numberifiable = 100
): number {
  const saneMin = toNumber(min);
  return Math.floor(Math.random() * (toNumber(max) - saneMin + 1)) + saneMin;
}
