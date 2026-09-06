import { defineMethod } from "~/compiler";

export default defineMethod({
  staticAliases: ["is"],
});

/**
 * Shorthand for `Array.isArray()`.
 */
export const isArray = Array.isArray;
