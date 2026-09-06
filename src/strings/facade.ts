import { defineFacade } from "~/compiler";
import { toString } from "./methods/toString";
import type { Stringifiable, ToString } from "./types";

/**
 * The S class, for String, provides useful methods for working with strings.
 */
export default defineFacade({
  name: "S",
  aliases: ["Str"],
  callable: toString,
  class: class<
    const Input extends Stringifiable,
    Value extends string = ToString<NoInfer<Input>>,
  > {
    readonly value: Value;

    constructor(value: Input) {
      this.value = toString(value) as ToString<Input> & Value;
    }

    static make<Input extends Stringifiable>(value: Input) {
      return new this(value);
    }

    get length(): number {
      return this.value.length;
    }

    toString(): Value {
      return this.value;
    }

    valueOf(): Value {
      return this.value;
    }

    [Symbol.toPrimitive](): Value {
      return this.value;
    }

    [Symbol.iterator]() {
      return this.value[Symbol.iterator]();
    }
  },
});
