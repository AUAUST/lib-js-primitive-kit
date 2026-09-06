import { defineFacade } from "~/compiler";
import { toNumber, type ToNumber } from "./methods/toNumber";
import type { Numberifiable } from "./types";

export default defineFacade({
  name: "N",
  aliases: ["Num"],
  callable: toNumber,
  class: class<
    const Input extends Numberifiable,
    Value extends number = ToNumber<Input>,
  > {
    readonly value: Value;

    constructor(value: Input) {
      this.value = toNumber(value) as ToNumber<Input> & Value;
    }

    valueOf(): Value {
      return this.value;
    }

    [Symbol.toPrimitive](): Value {
      return this.value;
    }
  },
});
