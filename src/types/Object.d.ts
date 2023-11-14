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

export type TAllKeys<
  T,
  Sep extends string = ".",
  Scope extends string | undefined = undefined
> = T extends object
  ? {
      [K in keyof T]-?: K extends string // If K is a string that doesn't contain the separator, proceed.
        ? K extends `${infer Before}${Sep}${infer After}`
          ? never // Exclude keys containing the separator.
          :
              | `${Scope extends undefined ? "" : `${Scope}${Sep}`}${K &
                  string}` // Add current scope with key.
              | TAllKeys<
                  T[K],
                  Sep,
                  `${Scope extends undefined ? "" : `${Scope}${Sep}`}${K &
                    string}`
                > // Recurse into the next level.
        : never; // Exclude non-string keys.
    }[keyof T]
  : never;

type TAllKeysExceptWithSeparator<T, Sep extends string = "."> = {
  [K in keyof T]: K extends string
    ? K extends `${infer _Before}${Sep}${infer _After}`
      ? never
      : K
    : never;
}[keyof T];

export interface TDeepGetFunction {
  // No arguments; the function returns the input.
  <T>(obj: T): T;
  // If we have a single argument without a dot in it, the function returns the value of the key.
  <T, K extends TAllKeysExceptWithSeparator<T>>(obj: T, k: K): T[K];
  // With a single argument, the function uses dot notation to split the key.
  <T, K extends PropertyKey>(obj: T, k: K): TGetValueFromDotNotation<T, K>;
  // Passing false as the second argument allows to prevent handling the key as dot notation.
  // If the key is false, ignore it and return the value of the first key.
  // If the key is a string, use it as a nested key.
  <T, K1 extends keyof T, K2 extends keyof T[K1] | false>(
    obj: T,
    k1: K1,
    k2: K2
  ): K2 extends false ? T[K1] : T[K1][K2];
  // From there it's just a matter of repeating the overloads as long as we want to hint more keys.
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
  // TDeepGet is recursive thus supports an infinite number of keys, but only types the return value.
  // This means the return value will always be valid (assuming TypeScript's aware of the object's structure),
  // but the keys won't be hinted from the 5th argument onwards.
  <T, K extends PropertyKey[]>(obj: T, ...keys: K): TDeepGet<T, K>;
}
