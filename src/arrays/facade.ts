import { defineFacade } from "~/compiler";
import { toArray } from "./methods/toArray";

export default defineFacade({
  name: "A",
  aliases: ["Arr"],
  callable: toArray,
  class: class<const T extends unknown[] = unknown[]> {
    constructor(readonly value: T) {}

    get length(): number {
      return this.value.length;
    }

    valueOf(): T {
      return this.value;
    }

    [Symbol.iterator](): ArrayIterator<T[number]> {
      return this.value[Symbol.iterator]();
    }
  },
});
