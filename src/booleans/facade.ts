import { defineFacade } from "~/compiler";
import { toBoolean } from "./methods/toBoolean";

export default defineFacade({
  name: "B",
  aliases: ["Bool"],
  callable: toBoolean,
  class: class<const T extends boolean = boolean> {
    constructor(readonly value: T) {}

    valueOf(): T {
      return this.value;
    }

    [Symbol.toPrimitive](): T {
      return this.value;
    }
  },
});
