import { defineFacade } from "~/compiler";
import type { Fn } from "~/functions/types";
import { toFunction, type ToFunction } from "./methods/toFunction";

export default defineFacade({
  name: "F",
  aliases: ["Func"],
  callable: toFunction,
  class: class<const Input, Value extends Fn = ToFunction<Input>> {
    readonly value: Value;

    constructor(value: Input) {
      this.value = toFunction(value) as ToFunction<Input> & Value;
    }

    static make<Input>(value: Input) {
      return new this(value);
    }

    valueOf(): Value {
      return this.value;
    }
  },
});
