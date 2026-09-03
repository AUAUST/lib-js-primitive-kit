import type { Stringifiable } from "~/strings/types";
import { decapitalize } from "./decapitalize";
import { toString } from "./toString";

/** Decpitalize the first letter of each word in a string. */
export function decapitalizeWords(str: Stringifiable): string {
  return toString(str).split(/\s+/).map(decapitalize).join(" ");
}
