import type { Arrayable } from "~/arrays/types";
import { defineMethod } from "~/compiler";
import { toArray } from "./toArray";

export default defineMethod({
  instanceCallable: "chainable",
});

export function keys(array: Arrayable) {
  return toArray(array).keys();
}
