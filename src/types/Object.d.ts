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

export type TDeepGet<T, K extends PropertyKey[] = []> = K extends [
  infer TFirstKey,
  ...infer TRestKeys
]
  ? TFirstKey extends keyof T
    ? TRestKeys extends PropertyKey[]
      ? TDeepGet<T[TFirstKey], Extract<TRestKeys, PropertyKey[]>>
      : unknown
    : unknown
  : T;

export interface TDeepGettable {
  deepGet<T>(obj: T): T;
  deepGet<T, K1 extends keyof T>(obj: T, k1: K1): T[K1];
  deepGet<T, K1 extends keyof T, K2 extends keyof T[K1]>(
    obj: T,
    k1: K1,
    k2: K2
  ): T[K1][K2];
  deepGet<
    T,
    K1 extends keyof T,
    K2 extends keyof T[K1],
    K3 extends keyof T[K1][K2]
  >(
    obj: T,
    k1: K1,
    k2: K2,
    k3: K3
  ): T[K1][K2][K3];
  deepGet<
    T,
    K1 extends keyof T,
    K2 extends keyof T[K1],
    K3 extends keyof T[K1][K2],
    K4 extends keyof T[K1][K2][K3]
  >(
    obj: T,
    k1: K1,
    k2: K2,
    k3: K3,
    k4: K4
  ): T[K1][K2][K3][K4];
  deepGet<T, K extends PropertyKey[]>(obj: T, ...keys: K): TDeepGet<T, K>;
}
