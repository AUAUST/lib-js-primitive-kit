import { isArray } from "~/arrays/methods";
import { defineMethod } from "~/compiler";
import type { Stringifiable } from "~/strings/types";
import { isString } from "./isString";
import { toString } from "./toString";

export default defineMethod({
  instanceCallable: "chainable",
});

/**
 * Takes a map of strings and replaces all occurrences of the keys with their values.
 * You may pass a 2-dimentional array with regexes as first values for more complex replacements.
 *
 * The third argument, `replaceAll`, is only used when the first argument is a string.
 * Use the global flag on the regexes if you want to replace all occurrences of a regex.
 */
export function mapReplace(
  str: Stringifiable,
  map:
    | Readonly<Record<string, string>>
    | Readonly<Readonly<[string | RegExp, Stringifiable]>[]>,
  replaceAll?: boolean,
) {
  let s = toString(str);
  const entries = isArray(map) ? map : Object.entries(map);

  for (const [key, value] of entries) {
    replaceAll && isString(key)
      ? (s = s.replaceAll(key, toString(value)))
      : (s = s.replace(key, toString(value)));
  }

  return s;
}
