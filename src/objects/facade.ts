import { defineFacade } from "~/compiler";
import type { GenericRecord } from "~/shared/types";
import { toObject } from "./methods/toObject";
import type { ToObject } from "./types";

export default defineFacade({
  name: "O",
  aliases: ["Obj"],
  factory: "o",
  callable: toObject,
  class: class<
    const Input extends GenericRecord<PropertyKey>,
    const Value extends GenericRecord = ToObject<Input>,
  > {
    readonly value: Value;

    constructor(value: Input) {
      this.value = toObject(value) as ToObject<Input> & Value;
    }

    static make<const Input extends GenericRecord<PropertyKey>>(value: Input) {
      return new this(value);
    }

    valueOf(): Value {
      return this.value;
    }

    toObject(): Value {
      return this.value;
    }
  },
});
