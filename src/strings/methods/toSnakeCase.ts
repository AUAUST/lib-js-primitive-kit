import { defineMethod } from "~/compiler";
import { CasingOptions } from "~/strings/helpers";
import type { Stringifiable } from "~/strings/types";
import { splitWords } from "./splitWords";

export default defineMethod({
  staticAliases: ["snake"],
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
