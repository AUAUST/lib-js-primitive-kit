import { isArray } from "~/arrays/methods";
import type { Values } from "~/objects/types";

export function values<T extends Object | any[] | null | undefined>(
  obj: T
): Values<T> {
  if (!obj) {
    return <any>[];
  }

  if (isArray(obj)) {
    return <any>obj;
  }

  return <any>Object.values(obj);
}
