import { defineFacade } from "~/compiler";
import type { ToArray } from "~/arrays/types";
import { toArray } from "./methods/toArray";
import type { Arrayable } from "./types";

export default defineFacade({
  name: "A",
  aliases: ["Arr"],
  factory: "a",
  callable: toArray,
  class: class<
    const Input extends Arrayable,
    const Value extends any[] = ToArray<Input>,
  > {
    readonly value: Value;

    constructor(value: Input) {
      this.value = toArray(value) as ToArray<Input> & Value;
    }

    static make<const Input extends Arrayable>(value: Input) {
      return new this(value);
    }

    get length(): number {
      return this.value.length;
    }

    valueOf(): Value {
      return this.value;
    }

    toArray(): Value {
      return this.value;
    }

    [Symbol.iterator]() {
      return this.value[Symbol.iterator]();
    }
  },
});
