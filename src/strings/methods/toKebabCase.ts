import { defineMethod } from "~/compiler";
import type { CasingOptions } from "~/strings/helpers";
import type { Stringifiable } from "~/strings/types";
import { splitWords } from "./splitWords";

export default defineMethod({
  methodAliases: ["kebab"],
  helperAliases: ["kebab"],
  instanceCallable: "chainable",
});

/**
 * Converts a string to kebab-case.
 */
export function toKebabCase(
  str: Stringifiable,
  options?: CasingOptions,
): string {
  return splitWords(str, options).join("-").toLowerCase();
}
