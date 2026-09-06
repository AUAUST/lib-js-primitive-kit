import { toBoolean } from "./toBoolean";

/**
 * Returns `true` if any of the given values are `true` when converted by `toBoolean`.
 */
export function some(values: any[]): boolean {
  return values.some(toBoolean);
}
