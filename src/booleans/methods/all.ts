import { toBoolean } from "./toBoolean";

/** Returns `true` if all the given values are `true` when converted by `toBoolean`. */
export function all(values: any[]): boolean {
  return values.every(toBoolean);
}
