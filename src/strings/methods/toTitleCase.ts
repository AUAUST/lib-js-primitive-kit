import type { Stringifiable } from "~/strings/types";
import { capitalize } from "./capitalize";
import { toString } from "./toString";

/**
 * Converts a string to Title Case.
 * It only splits the string by spaces.
 */
export function toTitleCase(str: Stringifiable): string {
  return toString(str)
    .split(/\s+/)
    .map(capitalize)
    .join(" ")
    .split("-")
    .map(capitalize)
    .join("-");
}
