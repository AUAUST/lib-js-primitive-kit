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

export type ToString<T> = T extends StringifiableValue
  ? T extends StringifiablePrimitives
    ? `${T}`
    : T extends EmptyStringifiable
      ? ""
      : string
  : T extends Stringifiable
    ? ToString<GetStringifiableValue<T>>
    : string;

export type Concatenated<
  T,
  Sep extends Stringifiable,
  Prev extends string = "",
> = T extends Stringifiable[]
  ? T extends [infer First, ...infer Rest]
    ? First extends Stringifiable
      ? Rest extends Stringifiable[]
        ? Concatenated<
            Rest,
            Sep,
            `${Prev}${Prev extends "" ? "" : ToString<Sep>}${ToString<First>}`
          >
        : never
      : never
    : Prev extends ""
      ? string
      : Prev
  : string;

export type AfterFirst<T extends Stringifiable, U extends Stringifiable> =
  ToString<T> extends `${string}${ToString<U>}${infer R}` ? R : string;

export type AfterStart<T extends Stringifiable, U extends Stringifiable> =
  ToString<T> extends `${ToString<U>}${infer R}` ? R : string;

export type BeforeEnd<T extends Stringifiable, U extends Stringifiable> =
  ToString<T> extends `${infer R}${ToString<U>}` ? R : string;

export type BeforeFirst<T extends Stringifiable, U extends Stringifiable> =
  ToString<T> extends `${infer R}${ToString<U>}${string}` ? R : string;

export type Split<S extends string, D extends string> = string extends S
  ? string[]
  : S extends ""
    ? []
    : S extends `${infer T}${D}${infer U}`
      ? [T, ...Split<U, D>]
      : [S];

export type SplitFirst<T extends Stringifiable, U extends Stringifiable> =
  ToString<T> extends `${string}${ToString<U>}${string}`
    ? [BeforeFirst<T, U>, AfterFirst<T, U>]
    : [T, ""];

/** Options shared by case-transforming string helpers. */
export type CasingOptions =
  | boolean
  | {
      ignoreCaps?: boolean;
      unaccent?: boolean;
    };

/** Options shared by string comparison helpers. */
export type ComparisonOptions =
  | boolean
  | {
      caseSensitive?: boolean;
      trim?: boolean;
      unaccent?: boolean;
    };

/** Options accepted by the random string generator. */
export type RandomStringOptions =
  | number
  | ({
      length?: number;
    } & (
      | {
          /** A complete character pool. Other options except length are ignored. */
          chars: string | number;
        }
      | {
          case?: "lower" | "upper" | "mixed";
          numbers?: boolean | string;
          symbols?: boolean | string;
        }
    ));
