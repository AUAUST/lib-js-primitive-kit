import { defineMethod } from "~/compiler";

export default defineMethod({
  staticAliases: ["isStrict"],
  helperAliases: ["isStrictString"],
  instanceCallable: true,
});

/**
 * A strict is-string check.
 * Returns true only for primitive strings, which length is greater than 0.
 */
export function isNotEmpty(x: unknown): x is string {
  return typeof x === "string" && x.length > 0;
}
