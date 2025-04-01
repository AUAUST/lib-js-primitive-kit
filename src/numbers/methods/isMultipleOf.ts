import type { Numberifiable } from "~/numbers/types";
import { toNumber } from "./toNumber";

export function isMultipleOf(
  num: Numberifiable,
  multiple: Numberifiable
): num is number {
  return toNumber(num) % toNumber(multiple) === 0;
}
