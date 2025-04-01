import type { Capitalized, Stringifiable } from "~/strings/types";
import { toString } from "./toString";

export function capitalize<T extends Stringifiable>(str: T): Capitalized<T> {
  const s = toString(str);
  return (s.charAt(0).toUpperCase() + s.slice(1)) as Capitalized<T>;
}
