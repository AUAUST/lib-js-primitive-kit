import { CasingOptions } from "~/strings/helpers";
import type { Stringifiable } from "~/strings/types";
import { splitWords } from "./splitWords";

export function toKebabCase(
  str: Stringifiable,
  options?: CasingOptions
): string {
  return splitWords(str, options).join("-").toLowerCase();
}
