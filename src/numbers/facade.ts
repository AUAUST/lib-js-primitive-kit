import { defineFacade } from "~/compiler";
import { toNumber } from "./methods/toNumber";

export default defineFacade({
  name: "N",
  aliases: ["Num"],
  callable: toNumber,
  class: class<const T extends number = number> {
    constructor(readonly value: T) {}

    valueOf(): T {
      return this.value;
    }

    [Symbol.toPrimitive](): T {
      return this.value;
    }
  },
});
