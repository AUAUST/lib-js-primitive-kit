import { defineMethod } from "~/compiler";
import type { CasingOptions } from "~/strings/types";
import type { Stringifiable } from "~/strings/types";
import { capitalize } from "./capitalize";
import { splitWords } from "./splitWords";

export default defineMethod({
  methodAliases: ["pascal", "toUpperCamelCase"],
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
