import { defineMethod } from "~/compiler";
import type { Fn } from "~/functions/types";

export default defineMethod({
  staticAliases: ["is"],
});

/**
 * Is-function check. Shortcut for `typeof x === "function"`.
 */
export function isFunction(fn: Fn | unknown): fn is Fn {
  return typeof fn === "function";
}
