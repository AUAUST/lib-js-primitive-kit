import { isArray } from "~/arrays/methods";
import type { Stringifiable } from "~/strings/types";
import { isString } from "./isString";
import { toString } from "./toString";

export function mapReplace(
  str: Stringifiable,
  map:
    | Readonly<Record<string, string>>
    | Readonly<Readonly<[string | RegExp, Stringifiable]>[]>,
  replaceAll?: boolean
) {
  let s = toString(str);
  const entries = isArray(map) ? map : Object.entries(map);

  for (const [key, value] of entries) {
    if (replaceAll && isString(key)) {
      s = s.replaceAll(key, toString(value));
      continue;
    }

    s = s.replace(key, toString(value));
  }

  return s;
}
