import { isArray } from "~/arrays/methods";
import { entries } from "./entries";
import { isStrictObject } from "./isStrictObject";

export function clone<T extends unknown>(
  obj: T,
  cloneArrays: boolean = true
): T {
  if (!obj) return obj;

  // Clone or copy arrays depending on the value of `cloneArrays`.
  if (isArray(obj)) {
    if (!cloneArrays) {
      return obj as T;
    }

    const c = [];

    for (const value of obj) {
      c.push(clone(value, cloneArrays));
    }

    return c as T;
  }

  // Primitives and class instances are cloned by reference.
  if (!isStrictObject(obj)) {
    return obj as T;
  }

  // Default logic for objects.
  const c = {} as Record<string, unknown>;

  for (const [key, value] of entries(obj)) {
    c[key] = clone(value, cloneArrays);
  }

  return c as T;
}
