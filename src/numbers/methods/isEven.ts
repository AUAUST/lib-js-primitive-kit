import type { Numberifiable } from "~/numbers/types";
import { isInteger } from "./isInteger";
import { toNumber } from "./toNumber";

export function isEven(num: Numberifiable): num is number {
  const saneNum = toNumber(num);
  return isInteger(saneNum) && (saneNum & 1) === 0;
}
