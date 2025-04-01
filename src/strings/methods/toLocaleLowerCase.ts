import type { Stringifiable } from "~/strings/types";
import { toString } from "./toString";

export function toLocaleLowerCase(
  str: Stringifiable,
  locales?: string | string[] | undefined
): string {
  return toString(str).toLocaleLowerCase(locales);
}
