import { defineMethod } from "~/compiler";
import { toNumber as numberToNumber } from "~/numbers/methods/toNumber";
import { toString, type Stringifiable } from "~/strings/methods";

export default defineMethod({
  helperAliases: ["stringToNumber"],
  instanceCallable: true,
});

export function toNumber(string: Stringifiable): number {
  return numberToNumber(toString(string));
}
