type EmptyStringifiable = null | undefined | void | "";
type StringifiablePrimitives = string | number | boolean | bigint;
type StringifiableValue = EmptyStringifiable | StringifiablePrimitives | symbol;

export type Stringifiable<T extends StringifiableValue = StringifiableValue> =
  | T
  | {
      toString(): T;
    }
  | {
      [Symbol.toPrimitive](): T;
    };

export type GetStringifiableValue<T> = T extends {
  [Symbol.toPrimitive](): infer R & StringifiableValue;
}
  ? R & StringifiableValue
  : T extends { toString(): infer R & StringifiableValue }
  ? R & StringifiableValue
  : string;

export type ToString<T extends Stringifiable> = T extends StringifiableValue
  ? T extends StringifiablePrimitives
    ? `${T}`
    : T extends EmptyStringifiable
    ? ""
    : string
  : ToString<GetStringifiableValue<T>>;

export type Lowercased<T extends Stringifiable> = Lowercase<ToString<T>>;
export type Uppercased<T extends Stringifiable> = Uppercase<ToString<T>>;
export type Capitalized<T extends Stringifiable> = Capitalize<ToString<T>>;
export type Decapitalize<T extends Stringifiable> = Uncapitalize<ToString<T>>;

export type Concatenated<
  T extends Stringifiable[],
  Sep extends Stringifiable,
  Prev extends string = ""
> = T extends [infer First, ...infer Rest]
  ? First extends Stringifiable
    ? Rest extends Stringifiable[]
      ? Concatenated<
          Rest,
          Sep,
          `${Prev}${Prev extends "" ? "" : ToString<Sep>}${ToString<First>}`
        >
      : never
    : never
  : Prev;
