/**
 * A type function that returns the keys of an object as a string literal type.
 */
export type TStringKeys<T> = keyof T extends infer K
  ? K extends string | number
    ? `${K}`
    : never
  : never;

/**
 * A type function that returns the values of an object as a union type.
 */
export type TValues<T> = T[keyof T];

export type TPickByValue<T, V> = Pick<
  T,
  { [K in keyof T]: T[K] extends V ? K : never }[keyof T]
>;

/**
 * A type function that returns the entries of an object as a tuple type.
 */
export type TEntries<T> = {
  [K in keyof T]: [keyof TPickByValue<T, T[K]>, T[K]];
}[keyof T][];

/**
 * A type function to apply to a deep-getter function.
 */
export interface TDeepGet {
  static deepGet(obj: T): T;
  static deepGet<A extends keyof T>(obj: T, a: A): T[A];
  static deepGet<A extends keyof T, B extends keyof T[A]>(
    obj: T,
    a: A,
    b: B
  ): T[A][B];
  static deepGet<
    A extends keyof T,
    B extends keyof T[A],
    C extends keyof T[A][B]
  >(
    obj: T,
    a: A,
    b: B,
    c: C
  ): T[A][B][C];
  static deepGet<
    A extends keyof T,
    B extends keyof T[A],
    C extends keyof T[A][B],
    D extends keyof T[A][B][C]
  >(
    obj: T,
    a: A,
    b: B,
    c: C,
    d: D
  ): T[A][B][C][D];
  static deepGet<
    A extends keyof T,
    B extends keyof T[A],
    C extends keyof T[A][B],
    D extends keyof T[A][B][C],
    E extends keyof T[A][B][C][D]
  >(
    obj: T,
    a: A,
    b: B,
    c: C,
    d: D,
    e: E
  ): T[A][B][C][D][E];
  static deepGet<
    A extends keyof T,
    B extends keyof T[A],
    C extends keyof T[A][B],
    D extends keyof T[A][B][C],
    E extends keyof T[A][B][C][D],
    F extends keyof T[A][B][C][D][E]
  >(
    obj: T,
    a: A,
    b: B,
    c: C,
    d: D,
    e: E,
    f: F
  ): T[A][B][C][D][E][F];
}

export type TDeepEndKeys<
  T,
  Scope extends string | undefined = undefined
> = T extends object
  ? {
      [K in keyof T]-?: K extends keyof T
        ? TDeepEndKeys<
            T[K],
            Scope extends undefined ? `${K & string}` : `${Scope}.${K & string}`
          >
        : never;
    }[keyof T]
  : Scope extends PropertyKey
  ? Scope
  : never;

export type TGetValueFromDotNotation<
  T,
  S extends string
> = S extends `${infer A}.${infer B}`
  ? A extends keyof T
    ? TGetValueFromDotNotation<T[A], B>
    : undefined
  : S extends keyof T
  ? T[S]
  : undefined;
