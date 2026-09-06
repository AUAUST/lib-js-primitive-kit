import { defineFacade } from "~/compiler";
import type { GenericRecord } from "~/objects/types";
import { toObject, type ToObject } from "./methods/toObject";

export default defineFacade({
  name: "O",
  aliases: ["Obj"],
  callable: toObject,
  class: class<
    const Input extends GenericRecord<PropertyKey>,
    Value extends GenericRecord = ToObject<Input>,
  > {
    readonly value: Value;

    constructor(value: Input) {
      this.value = toObject(value) as ToObject<Input> & Value;
    }

    valueOf(): Value {
      return this.value;
    }
  },
});
