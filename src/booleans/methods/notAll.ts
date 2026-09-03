import { all } from "./all";

/** Returns `true` if any of the given values are `false` when converted by `toBoolean`. */
export function notAll(values: any[]): boolean {
  return !all(values);
}
