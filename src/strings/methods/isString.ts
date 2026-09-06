import { defineMethod } from "~/compiler";

export default defineMethod({
  methodAliases: ["is"],
});

/**
 * Is-string check. Shortcut for `typeof x === "string"`.
 */
export function isString(x: any): x is string {
  return typeof x === "string";
}
