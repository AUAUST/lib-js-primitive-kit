import type { Stringifiable } from "~/strings/types";
import { decapitalize } from "./decapitalize";
import { toString } from "./toString";

export function decapitalizeWords(str: Stringifiable): string {
  return toString(str).split(/\s+/).map(decapitalize).join(" ");
}
