import type { Numberifiable } from "~/numbers/types";
import { toNumber } from "./toNumber";

export function isBetween(
  num: Numberifiable,
  min: Numberifiable,
  max: Numberifiable
): boolean {
  const saneNum = toNumber(num);
  return saneNum >= toNumber(min) && saneNum <= toNumber(max);
}
