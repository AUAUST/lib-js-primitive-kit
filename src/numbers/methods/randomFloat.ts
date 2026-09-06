import { defineMethod } from "~/compiler";
import type { Numberifiable } from "~/numbers/types";
import { toNumber } from "./toNumber";

export default defineMethod({
  methodAliases: ["randFloat"],
  helperAliases: ["randFloat"],
});

/**
 * Returns a random float between the provided numbers.
 * By default, `min` will be `0` and `max` will be `1`.
 */
export function randomFloat(
  min: Numberifiable = 0,
  max: Numberifiable = 1,
): number {
  const saneMin = toNumber(min);

  return Math.random() * (toNumber(max) - saneMin) + saneMin;
}
