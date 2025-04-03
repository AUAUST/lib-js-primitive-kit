import { concatOptions } from "~/strings/helpers";
import type { Concatenated, Stringifiable } from "~/strings/types";
import { toString } from "./toString";

export function concat<
  T extends Stringifiable[],
  L extends { separator: Stringifiable }
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
