import { defineMethod } from "~/compiler";
import type { Stringifiable } from "~/strings/types";
import { capitalize } from "./capitalize";
import { toString } from "./toString";

export default defineMethod({
  methodAliases: ["title"],
  helperAliases: ["title"],
  instanceCallable: "chainable",
});

/**
 * Converts a string to Title Case.
 * It only splits the string by spaces.
 */
export function toTitleCase(str: Stringifiable): string {
  return toString(str)
    .split(/\s+/)
    .map(capitalize)
    .join(" ")
    .split("-")
    .map(capitalize)
    .join("-");
}
