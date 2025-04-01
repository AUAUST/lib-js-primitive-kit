import type { Numberifiable } from "~/numbers/types";
import { isNumber } from "./isNumber";
import { toNumber } from "./toNumber";

export function formatNumberToString(
  num: Numberifiable,
  options?: {
    thousandsSeparator?: string;
    decimalSeparator?: string;
    fractionDigits?: number;
  }
): string {
  const saneNum = toNumber(num);
  const saneOptions = {
    thousandsSeparator: ",",
    decimalSeparator: ".",
    fractionDigits: undefined,
    ...options,
  };

  const parts =
    // Only use `toFixed()` if a maximum number of decimal digits is specified.
    isNumber(saneOptions.fractionDigits)
      ? saneNum.toFixed(saneOptions.fractionDigits).split(".")
      : saneNum.toString().split(".");

  parts[0] = parts[0]!.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    saneOptions.thousandsSeparator
  );

  return parts.join(saneOptions.decimalSeparator);
}
