import type { Stringifiable } from "~/strings/types";
import { isString } from "./isString";
import { toString } from "./toString";

export function trim(str: Stringifiable, chars?: string | RegExp): string {
  if (!chars) {
    return toString(str).trim();
  }

  if (isString(chars)) {
    return toString(str).replace(
      new RegExp(`^[${chars}]+|[${chars}]+$`, "g"),
      ""
    );
  }

  if (chars instanceof RegExp) {
    return toString(str).replace(
      new RegExp(`^(${chars.source})+|(${chars.source})+$`, "g"),
      ""
    );
  }

  throw new TypeError(
    "S.trim() only accepts strings or RegExp as second argument."
  );
}
