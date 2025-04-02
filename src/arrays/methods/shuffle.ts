import { isArray } from "./isArray";

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
// https://bost.ocks.org/mike/shuffle
export function shuffle<T>(arr: T[]): T[] {
  if (!isArray(arr)) {
    throw new TypeError("shuffle called on non-array");
  }

  let m = arr.length,
    t: T,
    i: number;

  while (m) {
    i = Math.floor(Math.random() * m--);
    t = arr[m]!;
    arr[m] = arr[i]!;
    arr[i] = t;
  }

  return arr;
}
