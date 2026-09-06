import { defineMethod } from "~/compiler";
import type { CasingOptions } from "~/strings/helpers";
import type { Stringifiable } from "~/strings/types";
import { capitalize } from "./capitalize";
import { splitWords } from "./splitWords";

export default defineMethod({
  staticAliases: ["camel"],
  helperAliases: ["camel"],
  instanceCallable: "chainable",
});

/**
 * Converts a string to camelCase.
 * Use `toPascalCase()` to convert to PascalCase (or UpperCamelCase).
 */
export function toCamelCase(
  str: Stringifiable,
  options?: CasingOptions,
): string {
  return splitWords(str, options)
    .map((word, index) => {
      if (index === 0) {
        return word.toLowerCase();
      }

      return capitalize(word.toLowerCase());
    })
    .join("");
}
