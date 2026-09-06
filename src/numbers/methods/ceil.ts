import { defineMethod } from "~/compiler";
import type { Numberifiable } from "~/numbers/types";
import { toNumber } from "./toNumber";

export default defineMethod({
  instanceCallable: "chainable",
});

/**
 * Ceils a number.
 */
export function ceil(num: Numberifiable): number {
  return Math.ceil(toNumber(num));
}
