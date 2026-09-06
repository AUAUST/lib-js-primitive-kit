import { defineFacade } from "~/compiler";
import { toObject } from "./methods/toObject";

export default defineFacade({
  name: "O",
  aliases: ["Obj"],
  callable: toObject,
  class: class<const T extends object = object> {
    constructor(readonly value: T) {}

    valueOf(): T {
      return this.value;
    }
  },
});
