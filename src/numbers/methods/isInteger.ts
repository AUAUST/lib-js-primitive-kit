import { Numberifiable } from "~/numbers/types";
import { toNumber } from "./toNumber";

/** Checks whether a number is an integer. */
export function isInteger(num: Numberifiable): boolean {
  return Number.isInteger(toNumber(num));
}
