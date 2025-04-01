import type { Stringifiable } from "~/strings/types";
import { toString } from "./toString";

export function toLocaleUpperCase(
  str: Stringifiable,
  locales?: string | string[] | undefined
): string {
  return toString(str).toLocaleUpperCase(locales);
}
