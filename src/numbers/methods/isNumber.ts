import { defineMethod } from "~/compiler";

export default defineMethod({
  methodAliases: ["is"],
});

/**
 * Is-number check. Shortcut for `typeof x === "number"`, but also returns `false` for `NaN`.
 */
export function isNumber(num: unknown): num is number {
  return typeof num === "number" && !isNaN(num);
}
