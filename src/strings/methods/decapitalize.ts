import type { Decapitalize, Stringifiable } from "~/strings/types";
import { toString } from "./toString";

export function decapitalize<T extends Stringifiable>(str: T): Decapitalize<T> {
  const s = toString(str);
  return (s.charAt(0).toLowerCase() + s.slice(1)) as Decapitalize<T>;
}
