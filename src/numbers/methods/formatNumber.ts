import type { Numberifiable } from "~/numbers/types";
import { isNumber } from "./isNumber";
import { toNumber } from "./toNumber";

export function formatNumber(
  num: Numberifiable,
  options: {
    thousandsSeparator?: string;
    decimalSeparator?: string;
    fractionDigits?: number;
  } = {}
): string {
  const {
    thousandsSeparator = ",",
    decimalSeparator = ".",
    fractionDigits,
  } = options;

  let [integer, fraction] = isNumber(fractionDigits)
    ? toNumber(num).toFixed(fractionDigits).split(".")
    : toNumber(num).toString().split(".");

  integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);

  return integer + (fraction ? decimalSeparator + fraction : "");
}
