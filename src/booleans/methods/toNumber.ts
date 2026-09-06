import { toBoolean } from "./toBoolean";

/**
 * Returns `1` if the input is truthy, `0` otherwise.
 */
export function toNumber(value: any): number {
  return toBoolean(value) ? 1 : 0;
}
