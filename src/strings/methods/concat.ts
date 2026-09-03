import { concatOptions } from "~/strings/helpers";
import type { Concatenated, Stringifiable } from "~/strings/types";
import { toString } from "./toString";

/**
 * Concatenates multiple strings, with an optional separator.
 * The separator is an empty string by default. To pass a separator, pass an object with a `separator` property as the last argument.
 */
export function concat<
  T extends Stringifiable[],
  L extends { separator: Stringifiable },
>(...args: [...T, L]): Concatenated<T, L["separator"]>;
export function concat<T extends Stringifiable[]>(
  ...args: T
): Concatenated<T, "">;
export function concat(
  ...args: [...Stringifiable[], { separator: Stringifiable } | Stringifiable]
): string;
export function concat(
  ...args: [...Stringifiable[], { separator: Stringifiable } | Stringifiable]
): string {
  const { separator, strings } = concatOptions(args);

  return strings.map(toString).filter(Boolean).join(separator);
}
