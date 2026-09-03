import type { Stringifiable } from "~/strings/types";
import { toString } from "./toString";

/** Returns the first argument that doesn't evaluate to an empty string. */
export function or(...args: Stringifiable[]): string {
  for (let arg of args) if ((arg = toString(arg))) return <string>arg;
  return "";
}
