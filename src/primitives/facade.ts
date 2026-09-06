import { defineFacade } from "~/compiler";
import { toPrimitive, type ToPrimitive } from "./methods/toPrimitive";

/**
 * The P class, for Primitives, provides useful methods for working with primitives globally.
 */
export default defineFacade({
  name: "P",
  callable: toPrimitive,
  class: class<const Input, Value = ToPrimitive<Input>> {
    readonly value: Value;

    constructor(value: Input) {
      this.value = toPrimitive(value) as ToPrimitive<Input> & Value;
    }

    valueOf(): Value {
      return this.value;
    }

    [Symbol.toPrimitive](): Value {
      return this.value;
    }
  },
});
