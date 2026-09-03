import { defineMethod } from "~/compiler";

export default defineMethod({
  staticAliases: ["is"],
});

/** Is-boolean check. Shortcut for `typeof x === "boolean"`. */
export function isBoolean(x: any): x is boolean {
  return typeof x === "boolean";
}
