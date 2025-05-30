import { Stringifiable } from "../types";
import { isString } from "./isString";
import { toString } from "./toString";

export function only(str: Stringifiable, chars: string | RegExp): string {
  const arr = Array.from(toString(str));

  if (isString(chars)) {
    return arr.filter((c) => chars.includes(c)).join("");
  }

  if (chars instanceof RegExp) {
    return arr.filter((c) => chars.test(c)).join("");
  }

  throw new TypeError(
    "S.only() only accepts strings or RegExp as second argument."
  );
}
