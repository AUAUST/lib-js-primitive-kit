import type { Stringifiable } from "~/strings/types";
import { capitalize } from "./capitalize";
import { toString } from "./toString";

export function toTitleCase(str: Stringifiable): string {
  return toString(str)
    .split(/\s+/)
    .map(capitalize)
    .join(" ")
    .split("-")
    .map(capitalize)
    .join("-");
}
