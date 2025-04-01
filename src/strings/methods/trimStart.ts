import type { Stringifiable } from "~/strings/types";
import { isString } from "./isString";
import { toString } from "./toString";

export function trimStart(str: Stringifiable, chars?: string | RegExp): string {
  if (!chars) {
    return toString(str).trimStart();
  }

  if (isString(chars)) {
    return toString(str).replace(new RegExp(`^[${chars}]+`, "g"), "");
  }

  if (chars instanceof RegExp) {
    return toString(str).replace(new RegExp(`^(${chars.source})+`, "g"), "");
  }

  throw new TypeError(
    "S.trimStart() only accepts strings or RegExp as second argument."
  );
}
