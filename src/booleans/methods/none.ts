import { some } from "./some";

/**
 * Returns `true` if none of the given values are `true` when converted by `toBoolean`.
 */
export function none(values: any[]): boolean {
  return !some(values);
}
