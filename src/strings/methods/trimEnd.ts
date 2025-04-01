import type { Stringifiable } from "~/strings/types";
import { isString } from "./isString";
import { toString } from "./toString";

export function trimEnd(str: Stringifiable, chars?: string | RegExp): string {
  if (!chars) {
    return toString(str).trimEnd();
  }

  if (isString(chars)) {
    return toString(str).replace(new RegExp(`[${chars}]+$`, "g"), "");
  }

  if (chars instanceof RegExp) {
    return toString(str).replace(new RegExp(`(${chars.source})+$`, "g"), "");
  }

  throw new TypeError(
    "S.trimEnd() only accepts strings or RegExp as second argument."
  );
}
