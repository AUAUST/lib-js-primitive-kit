import { defineMethod } from "~/compiler";
import { toNumber } from "~/numbers/methods/toNumber";
import type { Numberifiable } from "~/numbers/types";

export default defineMethod({
  helperAliases: ["numberToBoolean"],
  instanceCallable: true,
});

export function toBoolean(number: Numberifiable): boolean {
  return !!toNumber(number);
}
