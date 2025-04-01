import { Numberifiable } from "~/numbers/types";
import { toNumber } from "./toNumber";

export function isInteger(num: Numberifiable): boolean {
  return Number.isInteger(toNumber(num));
}
