import { toBoolean as booleanToBoolean } from "~/booleans/methods/toBoolean";
import { defineMethod } from "~/compiler";
import { toString } from "~/strings/methods";

export default defineMethod({
  helperAliases: ["stringToBoolean"],
  instanceCallable: true,
});

export function toBoolean(string: string): boolean {
  return booleanToBoolean(toString(string));
}
