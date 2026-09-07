import { defineMethod } from "~/compiler";
import type { Numberifiable } from "~/numbers/types";
import { toNumber } from "./toNumber";

export default defineMethod({
  helperAliases: ["radiansToDegrees"],
  instanceCallable: "chainable",
});

/**
 * Converts an angle from radians to degrees.
 */
export function toDegrees(num: Numberifiable): number {
  return (toNumber(num) * 180) / Math.PI;
}
