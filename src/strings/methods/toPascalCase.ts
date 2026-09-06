import { defineMethod } from "~/compiler";
import { CasingOptions } from "~/strings/helpers";
import type { Stringifiable } from "~/strings/types";
import { capitalize } from "./capitalize";
import { splitWords } from "./splitWords";

export default defineMethod({
  staticAliases: ["pascal", "toUpperCamelCase"],
  helperAliases: ["pascal", "toUpperCamelCase"],
  instanceCallable: "chainable",
});

/**
 * Converts a string to PascalCase, also known as UpperCamelCase.
 * Use `toCamelCase()` to convert to camelCase.
 */
export function toPascalCase(
  str: Stringifiable,
  options?: CasingOptions,
): string {
  return splitWords(str, options)
    .map((word) => capitalize(word.toLowerCase()))
    .join("");
}
