import type { Stringifiable } from "~/strings/types";
import { capitalize } from "./capitalize";
import { toString } from "./toString";

export function capitalizeWords(str: Stringifiable): string {
  return toString(str).split(/\s+/).map(capitalize).join(" ");
}
