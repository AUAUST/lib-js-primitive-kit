import { defineMethod } from "~/compiler";
import { toBoolean } from "./toBoolean";

export default defineMethod({
  instanceCallable: true,
});

/**
 * Returns `"true"` if the input is truthy, `"false"` otherwise.
 */
export function toString(value: any): string {
  return toBoolean(value) ? "true" : "false";
}
