import type { Stringifiable } from "~/strings/types";
import { toString } from "./toString";

export function remove(
  str: Stringifiable,
  substring: Stringifiable | RegExp
): string {
  return substring instanceof RegExp
    ? toString(str).replace(substring, "")
    : toString(str).replaceAll(toString(substring), "");
}
