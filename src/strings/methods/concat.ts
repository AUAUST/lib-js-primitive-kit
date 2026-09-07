import { defineMethod } from "~/compiler";
import { concatOptions } from "~/strings/helpers";
import type { Concatenated, Stringifiable } from "~/strings/types";
import { toString } from "./toString";

export default defineMethod({
  instanceCallable: "chainable",
});

/**
 * Concatenates multiple strings, with an optional separator.
 * The separator is an empty string by default. To pass a separator, pass an object with a `separator` property as the last argument.
 */
export function concat<
  const T extends Stringifiable,
  const A extends Stringifiable[],
  const L extends { separator: Stringifiable },
>(str: T, ...args: [...A, L]): Concatenated<[T, ...A], L["separator"]>;
export function concat<const T extends Stringifiable, const A extends Stringifiable[]>(
  str: T,
  ...args: A
): Concatenated<[T, ...A], "">;
export function concat(
  str: Stringifiable,
  ...args: [...Stringifiable[], { separator: Stringifiable } | Stringifiable]
): string;
export function concat(
  str: Stringifiable,
  ...args: [...Stringifiable[], { separator: Stringifiable } | Stringifiable]
): string {
  const { separator, strings } = concatOptions(args);

  strings.unshift(str);

  return strings.map(toString).filter(Boolean).join(separator);
}
