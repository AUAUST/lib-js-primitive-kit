import { defineFacade } from "~/compiler";
import { toFunction, type ToFunction } from "./methods/toFunction";

export default defineFacade({
  name: "F",
  aliases: ["Func"],
  callable: toFunction,
  class: class<const Input, Value extends Function = ToFunction<Input>> {
    readonly value: Value;

    constructor(value: Input) {
      this.value = toFunction(value) as ToFunction<Input> & Value;
    }

    valueOf(): Value {
      return this.value;
    }
  },
});
