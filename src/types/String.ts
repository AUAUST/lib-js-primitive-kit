export type Stringifiable =
  | string
  | String
  | number
  | boolean
  | bigint
  | symbol
  | null
  | undefined;
export type LooseStringInput =
  | Stringifiable
  | {
      toString(): Stringifiable;
    }
  | {
      [Symbol.toPrimitive](): Stringifiable;
    };
export type ToString<T extends LooseStringInput> = T extends string
  ? T
  : T extends String
  ? string
  : T extends null | undefined
  ? ""
  : T extends number | bigint | boolean
  ? `${T}`
  : T extends {
      toString(): Stringifiable;
    }
  ? ToString<ReturnType<T["toString"]>>
  : T extends {
      [Symbol.toPrimitive](): infer R extends Stringifiable;
    }
  ? ToString<R>
  : never;

export type Lowercased<T extends LooseStringInput> = Lowercase<ToString<T>>;
export type Uppercased<T extends LooseStringInput> = Uppercase<ToString<T>>;
export type Capitalized<T extends LooseStringInput> = Capitalize<ToString<T>>;

export type Concatenated<
  T extends any[],
  Sep extends LooseStringInput,
  Prev extends string = ""
> = T extends [infer First, ...infer Rest]
  ? First extends LooseStringInput
    ? Rest extends any[]
      ? Concatenated<
          Rest,
          Sep,
          `${Prev}${Prev extends "" ? "" : ToString<Sep>}${ToString<First>}`
        >
      : never
    : never
  : Prev;
