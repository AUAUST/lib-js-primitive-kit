import { defineMethod } from "~/compiler";
import type { CasingOptions } from "~/strings/types";
import type { Stringifiable } from "~/strings/types";
import { splitWords } from "./splitWords";

export default defineMethod({
  methodAliases: ["snake"],
  helperAliases: ["snake"],
  instanceCallable: "chainable",
});

/**
 * Converts a string to snake_case.
 */
export function toSnakeCase(
  str: Stringifiable,
  options?: CasingOptions,
): string {
  return splitWords(str, options).join("_").toLowerCase();
}
