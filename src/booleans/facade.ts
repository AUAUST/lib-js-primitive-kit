import { defineFacade } from "~/compiler";
import { toBoolean } from "./methods/toBoolean";
import type { Booleanifiable, ToBoolean } from "./types";

export default defineFacade({
  name: "B",
  aliases: ["Bool"],
  callable: toBoolean,
  class: class<
    const Input extends Booleanifiable,
    Value extends boolean = ToBoolean<Input>,
  > {
    readonly value: Value;

    constructor(value: Input) {
      this.value = toBoolean(value) as ToBoolean<Input> & Value;
    }

    valueOf(): Value {
      return this.value;
    }

    [Symbol.toPrimitive](): Value {
      return this.value;
    }
  },
});
