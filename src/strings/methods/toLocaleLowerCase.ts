import type { Stringifiable } from "~/strings/types";
import { toString } from "./toString";

/** Returns a string where all alphabetic characters have been converted to lowercase, taking into account the host environment's current locale. */
export function toLocaleLowerCase(
  str: Stringifiable,
  locales?: string | string[] | undefined,
): string {
  return toString(str).toLocaleLowerCase(locales);
}
