import { CasingOptions } from "~/strings/helpers";
import type { Stringifiable } from "~/strings/types";
import { splitWords } from "./splitWords";

/** Converts a string to kebab-case. */
export function toKebabCase(
  str: Stringifiable,
  options?: CasingOptions,
): string {
  return splitWords(str, options).join("-").toLowerCase();
}
