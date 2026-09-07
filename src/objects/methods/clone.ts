import { isArray } from "~/arrays/methods";
import { defineMethod } from "~/compiler";
import type { GenericRecord } from "../types";
import { entries } from "./entries";
import { isPlainObject } from "./isPlainObject";

export default defineMethod({
  instanceCallable: "chainable",
});

/**
 * Clones an object deeply. Class instances are copied by reference.
 *
 * The second argument is a boolean whether to clone arrays as well.
 * If `false`, arrays will be copied by reference. If `true` (default), arrays will be cloned deeply as well.
 */
export function clone<const T>(obj: T, cloneArrays?: boolean): T;
export function clone(obj: unknown, cloneArrays: boolean = true): unknown {
  if (isArray(obj)) {
    if (!cloneArrays) {
      return obj;
    }

    return obj.map((item) => clone(item, cloneArrays));
  }

  if (!isPlainObject(obj)) {
    return obj; // Class instances are cloned by reference.
  }

  const c: GenericRecord = {};

  for (const [key, value] of entries(obj)) {
    c[key] = clone(value, cloneArrays);
  }

  return c;
}
