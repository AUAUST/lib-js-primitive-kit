import { defineFacade } from "~/compiler";
import { toPrimitive } from "./methods/toPrimitive";

/**
 * The P class, for Primitives, provides useful methods for working with primitives globally.
 */
export default defineFacade({
  name: "P",
  callable: toPrimitive,
  class: class<const T = unknown> {
    constructor(readonly value: T) {}

    valueOf(): T {
      return this.value;
    }
  },
});
