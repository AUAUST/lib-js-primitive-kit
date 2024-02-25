type _Stringifiable =
  | string
  | String
  | number
  | boolean
  | bigint
  | symbol
  | null
  | undefined;

export type Stringifiable =
  | _Stringifiable
  | {
      toString(): _Stringifiable;
    }
  | {
      [Symbol.toPrimitive](): _Stringifiable;
    };

export type ToString<T extends Stringifiable> = T extends string
  ? T
  : T extends String
  ? string
  : T extends null | undefined
  ? ""
  : T extends number | bigint | boolean
  ? `${T}`
  : T extends {
      toString(): _Stringifiable;
    }
  ? ToString<ReturnType<T["toString"]>>
  : T extends {
      [Symbol.toPrimitive](): infer R extends _Stringifiable;
    }
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