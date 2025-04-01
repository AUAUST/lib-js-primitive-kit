import type { Numberifiable } from "~/numbers/types";

export function isLooseNumber(num: unknown): num is Numberifiable {
  if (num === null || num === undefined) {
    return false;
  }

  num = num.valueOf();

  switch (typeof num) {
    case "number":
      return true;
    case "string":
      return !isNaN(+num) && !isNaN(Number.parseFloat(num));
    default:
      return false;
  }
}
