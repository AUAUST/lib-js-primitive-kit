import { concatOptions } from "~/strings/helpers";
import type { Concatenated, Stringifiable } from "~/strings/types";
import { toString } from "./toString";

export function concat<
  T extends Stringifiable[],
  L extends { separator: Stringifiable } | Stringifiable
>(
  ...args: [...T, L]
): L extends { separator: Stringifiable }
  ? Concatenated<T, L["separator"]>
  : L extends Stringifiable
  ? Concatenated<[...T, L], "">
  : never {
  const { separator, strings } = concatOptions(args);

  return <any>strings.map(toString).filter(Boolean).join(separator);
}
