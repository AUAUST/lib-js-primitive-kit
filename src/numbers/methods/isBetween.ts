import type { Numberifiable } from "~/numbers/types";
import { toNumber } from "./toNumber";

/** Checks whether a number is between a minimum and a maximum, inclusively. */
export function isBetween(
  num: Numberifiable,
  min: Numberifiable,
  max: Numberifiable,
): boolean {
  const saneNum = toNumber(num);
  return saneNum >= toNumber(min) && saneNum <= toNumber(max);
}
