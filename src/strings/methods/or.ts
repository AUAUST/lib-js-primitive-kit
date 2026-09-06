import { defineMethod } from "~/compiler";
import type { Stringifiable } from "~/strings/types";
import { toString } from "./toString";

export default defineMethod({
  instanceCallable: "chainable",
});

/**
 * Returns the first argument that doesn't evaluate to an empty string.
 */
export function or(...args: Stringifiable[]): string {
  for (let arg of args) if ((arg = toString(arg))) return <string>arg;
  return "";
}
