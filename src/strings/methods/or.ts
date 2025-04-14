import type { Stringifiable } from "~/strings/types";
import { toString } from "./toString";

export function or(...args: Stringifiable[]): string {
  for (let arg of args) if ((arg = toString(arg))) return <string>arg;
  return "";
}
