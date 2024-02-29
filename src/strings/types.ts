type _EmptyStringifiable = null | undefined;
type _StringifiablePrimitive = string | number | boolean | bigint;
type _Stringifiable =
  | _EmptyStringifiable
  | _StringifiablePrimitive
  | String
  | symbol;

export type Stringifiable<T extends _Stringifiable = _Stringifiable> =
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

export type ToString<T extends Stringifiable> =
  T extends _StringifiablePrimitive
    ? `${T}`
    : T extends _EmptyStringifiable
    ? ""
    : T extends String | symbol
    ? string
    : T extends Stringifiable<infer R>
    ? ToString<R>
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
