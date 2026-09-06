import { defineMethod } from "~/compiler";
import { toBoolean } from "./toBoolean";

export default defineMethod({
  instanceCallable: true,
});

/**
 * Compares two boolean after converting them to booleans using `B.from()`.
 */
export function equals(a: any, b: any): boolean {
  return toBoolean(a) === toBoolean(b);
}
