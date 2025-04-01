import type { Numberifiable } from "~/numbers/types";
import { sum } from "./sum";

export function average(...nums: Numberifiable[]): number {
  return sum(...nums) / nums.length;
}
