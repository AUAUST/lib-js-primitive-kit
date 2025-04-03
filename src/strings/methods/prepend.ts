import { concatOptions } from "~/strings/helpers";
import type { Concatenated, Stringifiable } from "~/strings/types";
import { toString } from "./toString";

export function prepend<
  S extends Stringifiable,
  T extends Stringifiable[],
  L extends { separator: Stringifiable }
>(str: S, ...args: [...T, L]): Concatenated<[...T, S], L["separator"]>;
export function prepend<S extends Stringifiable, T extends Stringifiable[]>(
  str: S,
  ...args: [...T]
): Concatenated<[...T, S], "">;
export function prepend(
  str: Stringifiable,
  ...args: [...Stringifiable[], { separator: Stringifiable } | Stringifiable]
): string;
export function prepend(
  str: Stringifiable,
  ...args: [...Stringifiable[], { separator: Stringifiable } | Stringifiable]
): string {
  const { separator, strings } = concatOptions(args);

  return strings
    .map(toString)
    .concat(toString(str))
    .filter(Boolean)
    .join(separator);
}
