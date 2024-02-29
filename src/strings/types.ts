type EmptyStringifiable = null | undefined;
type StringifiablePrimitives = string | number | boolean | bigint;
type StringifiableValue =
  | EmptyStringifiable
  | StringifiablePrimitives
  | String
  | symbol;

export type Stringifiable<T extends StringifiableValue = StringifiableValue> =
  | T
  | {
      valueOf(): T;
    }
  | {
      toString(): T;
    }
  | {
      [Symbol.toPrimitive](): T;
    };

export type ToString<T extends Stringifiable> = T extends Stringifiable<infer R>
  ? R extends StringifiablePrimitives
    ? `${R}`
    : R extends EmptyStringifiable
    ? ""
    : string
  : never;

export type Lowercased<T extends Stringifiable> = Lowercase<ToString<T>>;
export type Uppercased<T extends Stringifiable> = Uppercase<ToString<T>>;
export type Capitalized<T extends Stringifiable> = Capitalize<ToString<T>>;

export type Concatenated<
  T extends any[],
  Sep extends Stringifiable,
  Prev extends string = ""
> = T extends [infer First, ...infer Rest]
  ? First extends Stringifiable
    ? Rest extends any[]
      ? Concatenated<
          Rest,
          Sep,
          `${Prev}${Prev extends "" ? "" : ToString<Sep>}${ToString<First>}`
        >
      : never
    : never
  : Prev;
