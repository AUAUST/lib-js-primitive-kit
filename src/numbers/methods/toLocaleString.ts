import type { Numberifiable } from "~/numbers/types";
import { toNumber } from "./toNumber";

export function toLocaleString(
  num: Numberifiable,
  ...args: Parameters<Number["toLocaleString"]>
): string {
  return toNumber(num).toLocaleString(...args);
}
