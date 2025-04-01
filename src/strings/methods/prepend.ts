import { concatOptions } from "~/strings/helpers";
import type { Concatenated, Stringifiable } from "~/strings/types";
import { toString } from "./toString";

export function prepend<
  T extends Stringifiable,
  P extends Stringifiable[],
  L extends { separator: Stringifiable } | Stringifiable
>(
  str: T,
  ...args: [...P, L]
): L extends { separator: Stringifiable }
  ? Concatenated<[...P, T], L["separator"]>
  : L extends Stringifiable
  ? Concatenated<[...P, T, L], "">
  : never {
  const { separator, strings } = concatOptions(args);

  return <any>(
    strings.map(toString).concat(toString(str)).filter(Boolean).join(separator)
  );
}
