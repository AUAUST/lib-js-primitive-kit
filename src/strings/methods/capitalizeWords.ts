import { defineMethod } from "~/compiler";
import type { Stringifiable } from "~/strings/types";
import { capitalize } from "./capitalize";
import { toString } from "./toString";

export default defineMethod({
  instanceCallable: "chainable",
});

/**
 * Capitalizes the first letter of each word in a string.
 */
export function capitalizeWords(str: Stringifiable): string {
  return toString(str).split(/\s+/).map(capitalize).join(" ");
}
