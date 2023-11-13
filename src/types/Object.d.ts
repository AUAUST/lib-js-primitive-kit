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

export type TDeepEndValues<T> = T extends object
  ? { [K in keyof T]: TDeepEndValues<T[K]> }[keyof T]
  : T;

export type TDeepEndKeys<
  T,
  Sep extends string | ((...k) => PropertyKey) = ".",
  Scope extends string | undefined = undefined
> = Sep extends string
  ? T extends object
    ? {
        [K in keyof T]-?: K extends keyof T
          ? TDeepEndKeys<
              T[K],
              Sep,
              Scope extends undefined
                ? `${K & string}`
                : `${Scope}${Sep}${K & string}`
            >
          : never;
      }[keyof T]
    : Scope extends PropertyKey
    ? Scope
    : never
  : ReturnType<Sep>;

export type TGetValueFromDotNotation<
  T,
  S extends string,
  Sep extends string | ((...k) => PropertyKey) = "."
> = Sep extends string
  ? S extends `${infer A}${Sep}${infer B}`
    ? A extends keyof T
      ? TGetValueFromDotNotation<T[A], B, Sep>
      : undefined
    : S extends keyof T
    ? T[S]
    : undefined
  : TDeepEndValues<T>;

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

export interface TDeepGetFunction {
  <T>(obj: T): T;
  <T, K1 extends keyof T>(obj: T, k1: K1): T[K1];
  <T, K1 extends keyof T, K2 extends keyof T[K1]>(
    obj: T,
    k1: K1,
    k2: K2
  ): T[K1][K2];
  <T, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2]>(
    obj: T,
    k1: K1,
    k2: K2,
    k3: K3
  ): T[K1][K2][K3];
  <
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
  <T, K extends PropertyKey[]>(obj: T, ...keys: K): TDeepGet<T, K>;
}
