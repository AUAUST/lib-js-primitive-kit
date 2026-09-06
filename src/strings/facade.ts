import { defineFacade } from "~/compiler";
import { toString } from "./methods/toString";

/**
 * The S class, for String, provides useful methods for working with strings.
 */
export default defineFacade({
  name: "S",
  aliases: ["Str"],
  callable: toString,
  class: class<const T extends string = string> {
    constructor(readonly value: T) {}

    get length(): number {
      return this.value.length;
    }

    toString(): T {
      return this.value;
    }

    valueOf(): T {
      return this.value;
    }

    [Symbol.toPrimitive](): T {
      return this.value;
    }
  },
});
