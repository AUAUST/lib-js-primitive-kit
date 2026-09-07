import { defineMethod } from "~/compiler";
import type { Numberifiable } from "~/numbers/types";
import { toNumber } from "./toNumber";

export default defineMethod({
  helperAliases: ["degreesToRadians"],
  instanceCallable: "chainable",
});

/**
 * Converts an angle from degrees to radians.
 */
export function toRadians(num: Numberifiable): number {
  return (toNumber(num) * Math.PI) / 180;
}
