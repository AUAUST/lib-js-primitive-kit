import { defineFacade } from "~/compiler";
import type { Fn } from "~/functions/types";
import type { ToFunction } from "./types";
import { toFunction } from "./methods/toFunction";

export default defineFacade({
  name: "F",
  aliases: ["Func"],
  callable: toFunction,
  factory: "f",
  class: class<
    const Input,
    const Value extends Fn = ToFunction<Input>,
  > extends Function {
    declare readonly value: Value;

    constructor(value: Input) {
      super();

      const fn = toFunction(value) as ToFunction<Input> & Value;

      const callable = function (this: any, ...args: Parameters<Value>) {
        return fn.apply(this, args);
      };

      Object.setPrototypeOf(callable, new.target.prototype);

      Object.defineProperty(callable, "value", {
        configurable: false,
        enumerable: true,
        value: fn,
        writable: false,
      });

      return callable as unknown as this;
    }

    static make<const Input>(value: Input) {
      return new this(value);
    }

    valueOf(): Value {
      return this.value;
    }

    toFunction(): Value {
      return this.value;
    }
  },
});
