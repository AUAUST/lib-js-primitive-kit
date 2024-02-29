type _Stringifiable =
  | string
  | String
  | number
  | boolean
  | bigint
  | symbol
  | null
  | undefined;

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

export type ToString<T extends Stringifiable> = T extends string
  ? T
  : T extends String
  ? string
  : T extends null | undefined
  ? ""
  : T extends number | bigint | boolean
  ? `${T}`
  : T extends {
      // symbol being included in the type causes infinite recursion specifically with `valueOf` for some reason
      valueOf(): Exclude<_Stringifiable, symbol>;
    }
  ? ToString<ReturnType<T["valueOf"]>>
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
