import { isArray } from "~/arrays/methods";
import type { Entries } from "~/objects/types";

export function entries<T extends Object | any[] | null | undefined>(
  obj: T
): Entries<T> {
  if (!obj) {
    return <any>[];
  }

  if (isArray(obj)) {
    return <any>Array.from(obj.entries());
  }

  return <any>Object.entries(obj);
}
