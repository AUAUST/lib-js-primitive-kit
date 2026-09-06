import { defineMethod } from "~/compiler";

export default defineMethod({
  methodAliases: ["is"],
});

/**
 * Simple is-primitive check. Returns `true` for any primitive value.
 *
 * Returns `true` for strings, numbers, and booleans.
 * `Infinity` and `NaN` both return `true`.
 * Returns `false` for any other value, including `null`, `undefined` and functions.
 */
export function isPrimitive(input: any): input is string | number | boolean {
  switch (typeof input) {
    case "string":
    case "number":
    case "boolean":
      return true;
    default:
      return false;
  }
}
