import { CasingOptions } from "~/strings/helpers";
import type { Stringifiable } from "~/strings/types";
import { splitWords } from "./splitWords";

/** Converts a string to snake_case. */
export function toSnakeCase(
  str: Stringifiable,
  options?: CasingOptions,
): string {
  return splitWords(str, options).join("_").toLowerCase();
}
