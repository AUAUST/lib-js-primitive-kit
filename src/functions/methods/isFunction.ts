import { defineMethod } from "~/compiler";
import type { Fn } from "~/functions/types";

export default defineMethod({
  methodAliases: ["is"],
});

/**
 * Is-function check. Shortcut for `typeof x === "function"`.
 */
export function isFunction(fn: unknown): fn is Fn {
  return typeof fn === "function";
}
