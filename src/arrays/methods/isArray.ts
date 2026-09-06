import { defineMethod } from "~/compiler";

export default defineMethod({
  methodAliases: ["is"],
});

/**
 * Shorthand for `Array.isArray()`.
 */
export const isArray = Array.isArray;
