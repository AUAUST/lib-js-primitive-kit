import { isArray } from "~/arrays/methods";
import type { Keys } from "~/objects/types";

export function keys<T extends Object>(obj: T | null | undefined): Keys<T> {
  if (!obj) {
    return <any>[];
  }

  if (isArray(obj)) {
    return <any>Array.from(obj.keys());
  }

  return <any>Object.keys(obj);
}
