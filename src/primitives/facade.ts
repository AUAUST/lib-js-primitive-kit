import { defineFacade } from "~/compiler";
import type { ToPrimitive } from "./types";
import { toPrimitive } from "./methods/toPrimitive";

/**
 * The P class, for Primitives, provides useful methods for working with primitives globally.
 */
export default defineFacade({
  name: "P",
  callable: toPrimitive,
  class: class<const Input, const Value = ToPrimitive<Input>> {
    readonly value: Value;

    constructor(value: Input) {
      this.value = toPrimitive(value) as ToPrimitive<Input> & Value;
    }

    static make<const Input>(value: Input) {
      return new this(value);
    }

    valueOf(): Value {
      return this.value;
    }

    toPrimitive(): Value {
      return this.value;
    }

    [Symbol.toPrimitive](): Value {
      return this.value;
    }
  },
});
