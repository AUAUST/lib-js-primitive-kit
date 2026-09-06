import { defineFacade } from "~/compiler";
import type { Fn } from "~/functions/types";
import { toFunction } from "./methods/toFunction";

export default defineFacade({
  name: "F",
  aliases: ["Func"],
  callable: toFunction,
  class: class<const T extends Fn = Fn> {
    constructor(readonly value: T) {}

    valueOf(): T {
      return this.value;
    }
  },
});
