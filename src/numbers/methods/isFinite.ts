import { defineMethod } from "~/compiler";

export default defineMethod({
  staticAliases: ["isStrictNumber", "isStrict"],
  helperAliases: ["isStrictNumber"],
});

/**
 * Returns a boolean whether the given input is a real number.
 * Only true for primitive numbers that are not `NaN` and are finite.
 */
export function isFinite(num: unknown): num is number {
  return Number.isFinite(num); // returns false for NaN too.
}
