import { toBoolean } from "./toBoolean";

/**
 * Returns `"true"` if the input is truthy, `"false"` otherwise.
 */
export function toString(value: any): string {
  return toBoolean(value) ? "true" : "false";
}
