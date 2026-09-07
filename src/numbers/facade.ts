import { defineFacade } from "~/compiler";
import { toNumber } from "./methods/toNumber";
import type { Numberifiable, ToNumber } from "./types";

export default defineFacade({
  name: "N",
  aliases: ["Num"],
  factory: "n",
  callable: toNumber,
  class: class<
    const Input extends Numberifiable,
    const Value extends number = ToNumber<Input>,
  > {
    readonly value: Value;

    constructor(value: Input) {
      this.value = toNumber(value) as ToNumber<Input> & Value;
    }

    static make<const Input extends Numberifiable>(value: Input) {
      return new this(value);
    }

    valueOf(): Value {
      return this.value;
    }

    toNumber(): Value {
      return this.value;
    }

    [Symbol.toPrimitive](): Value {
      return this.value;
    }
  },
});
