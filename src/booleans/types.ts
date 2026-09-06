export type BooleanValue =
  | boolean
  | Boolean
  | 0
  | 1
  | "true"
  | "True"
  | "TRUE"
  | "false"
  | "False"
  | "FALSE";

export type Booleanifiable<T extends BooleanValue = BooleanValue> =
  | T
  | { valueOf(): T }
  | { [Symbol.toPrimitive](): T };

type FalseBooleanValue =
  | null
  | undefined
  | void
  | false
  | 0
  | 0n
  | ""
  | "0"
  | "false"
  | "False"
  | "FALSE";

export type ToBoolean<T> = T extends FalseBooleanValue
  ? false
  : T extends true | 1 | 1n
    ? true
    : T extends string | number | bigint | boolean
      ? boolean
      : T extends { valueOf(): infer Value }
        ? Value extends T
          ? boolean
          : ToBoolean<Value>
        : boolean;
