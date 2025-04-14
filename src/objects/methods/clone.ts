import { isArray } from "~/arrays/methods";
import type { ObjectType } from "../types";
import { entries } from "./entries";
import { isStrictObject } from "./isStrictObject";

export function clone<T extends unknown>(obj: T, cloneArrays?: boolean): T;
export function clone(obj: unknown, cloneArrays: boolean = true): unknown {
  if (!obj) return obj;

  // Clone or copy arrays depending on the value of `cloneArrays`.
  if (isArray(obj)) {
    if (!cloneArrays) {
      return obj;
    }

    const c = [];

    for (const value of obj) {
      c.push(clone(value, cloneArrays));
    }

    return c;
  }

  // Primitives and class instances are cloned by reference.
  if (!isStrictObject(obj)) {
    return obj;
  }

  // Default logic for objects.
  const c: ObjectType = {};

  for (const [key, value] of entries(obj)) {
    c[key] = clone(value, cloneArrays);
  }

  return c;
}
