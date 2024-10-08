import type { IfAny, IfNever, IfUnknown } from "type-fest";

export type ToObject<T> = T extends null | undefined
  ? {}
  : T extends (infer R)[]
  ? IfNever<R, {}, { [K: `${number}`]: ToObject<R> }>
  : T extends number
  ? Number
  : T extends string
  ? String
  : T extends boolean
  ? Boolean
  : T;

/**
 * The type used to type the keys of an object when we can't stricly type them.
 * It can either be an array of numbers if the value is an array, or an array of strings if the value is an object.
 * There can't be mix of strings and numbers.
 */
export type UnknownKeys = string[] | number[];

/**
 * A type function that returns the keys of an object as a string literal type.
 */
export type Keys<T> = IfAny<
  T,
  UnknownKeys,
  IfUnknown<
    T,
    UnknownKeys,
    T extends any[]
      ? number[]
      : keyof T extends never
      ? string[]
      : T extends object
      ? (keyof T)[]
      : UnknownKeys
  >
>;

/**
 * A type function that returns the values of an object as a union type.
 */
export type Values<T> = IfAny<
  T,
  unknown[],
  IfUnknown<
    T,
    unknown[],
    T extends any[]
      ? T[number][]
      : keyof T extends never
      ? unknown[]
      : T extends object
      ? T[keyof T][]
      : unknown[]
  >
>;
export type PickByValue<T, V> = Pick<
  T,
  { [K in keyof T]: T[K] extends V ? K : never }[keyof T]
>;

/**
 * A type function that returns the entries of an object as a tuple type.
 */
export type Entries<T> = IfAny<
  T,
  [string, unknown][] | [number, unknown][],
  IfUnknown<
    T,
    [string, unknown][] | [number, unknown][],
    T extends []
      ? []
      : keyof T extends never
      ? []
      : T extends any[]
      ? [number, T[number]][]
      : T extends Record<string | number, any>
      ? NonNullable<
          {
            [K in keyof T]: [K, T[K]];
          }[keyof T]
        >[]
      : []
  >
>;

export type DeepEndValues<T> = T extends object
  ? { [K in keyof T]: DeepEndValues<T[K]> }[keyof T]
  : T;

export type DeepEndKeys<
  T,
  Sep extends string | ((...k: any[]) => PropertyKey) = ".",
  Scope extends string | undefined = undefined
> = Sep extends string
  ? T extends object
    ? {
        [K in keyof T]-?: K extends keyof T
          ? DeepEndKeys<
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
  : Sep extends (...k: any[]) => infer R
  ? R extends PropertyKey
    ? R
    : never
  : never;

export type DeepGet<
  T,
  K extends PropertyKey[] = [],
  R = unknown // The type of a return value that can't be inferred.
> = K extends [infer TFirstKey, ...infer TRestKeys]
  ? TFirstKey extends keyof T
    ? TRestKeys extends PropertyKey[]
      ? DeepGet<T[TFirstKey], Extract<TRestKeys, PropertyKey[]>>
      : R
    : R
  : T;

export type GetValueFromDotNotation<
  T,
  S extends string,
  Sep extends string | ((...k: any[]) => PropertyKey) = ".",
  R = unknown // The type of a return value that can't be inferred.
> = Sep extends string
  ? S extends `${infer A}${Sep}${infer B}`
    ? A extends keyof T
      ? GetValueFromDotNotation<T[A], B, Sep>
      : R
    : S extends keyof T
    ? T[S]
    : R
  : DeepEndValues<T>;

export type AllKeys<
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
              | AllKeys<
                  T[K],
                  Sep,
                  `${Scope extends undefined ? "" : `${Scope}${Sep}`}${K &
                    string}`
                > // Recurse into the next level.
        : never; // Exclude non-string keys.
    }[keyof T]
  : never;

type AllKeysExceptWithSeparator<T, Sep extends string = "."> = {
  [K in keyof T]: K extends string
    ? K extends `${infer _Before}${Sep}${infer _After}`
      ? never
      : K
    : never;
}[keyof T];

export interface DeepGetFunction {
  // No arguments; the function returns the input.
  <T>(obj: T): T;
  // If we have a single argument without a dot in it, the function returns the value of the key.
  <T, K extends AllKeysExceptWithSeparator<T>>(obj: T, k: K): T[K];
  // With a single argument, the function uses dot notation to split the key.
  <T, K extends string>(obj: T, k: K): GetValueFromDotNotation<T, K>;
  // Passing false as the second argument allows to prevent handling the key as dot notation.
  // If the key is false, ignore it and return the value of the first key.
  // If the key is a string, use it as a nested key.
  <T, K1 extends keyof T, K2 extends keyof T[K1] | false>(
    obj: T,
    k1: K1,
    k2: K2
  ): K2 extends keyof T[K1] ? T[K1][K2] : K2 extends false ? T[K1] : never;
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
  <T, K extends PropertyKey[]>(obj: T, ...keys: K): DeepGet<T, K>;
}

export type HasKeysOptions = {
  /**
   * Whether to check for the existence of symbols.
   */
  symbols?: boolean;
  /**
   * The list of keys to check for. If undefined, will check for the presence of any key.
   */
  keys?: PropertyKey[];
  /**
   * Whether to check only for enumerable keys.
   */
  onlyEnumerable?: boolean;
};

type WithStringKeys<O extends PropertyKey[] | HasKeysOptions | undefined> =
  O extends PropertyKey[]
    ? { [K in O[number]]: unknown }
    : O extends HasKeysOptions & { keys: PropertyKey[] }
    ? { [K in O["keys"][number]]: unknown }
    : {};

type WithSymbols<O extends PropertyKey[] | HasKeysOptions | undefined> =
  O extends HasKeysOptions
    ? O["symbols"] extends true
      ? { [K in symbol]: unknown }
      : {}
    : {};

export type WithKeys<O extends PropertyKey[] | HasKeysOptions | undefined> =
  O extends undefined
    ? {
        [k: string]: unknown;
      }
    : WithStringKeys<O> & WithSymbols<O>;

/**
 * Helper type that gets the "real" type of a property descriptor.
 * First tries the `value` property if it exists, then falls back to the `get` and `set` properties.
 */
type PropertyDescriptorType<T extends PropertyDescriptor> = T extends {
  value: infer V;
}
  ? V
  : T extends {
      get(): infer G;
    }
  ? G
  : T extends {
      set(): infer S;
    }
  ? S
  : never;

export type ObjectWithProperty<
  T,
  K extends PropertyKey,
  D extends PropertyDescriptor
> = T & {
  [P in K]: PropertyDescriptorType<D>;
};

export type Picked<
  T extends object,
  K extends keyof T,
  C extends ((key: K, value: T[K]) => any) | undefined = undefined
> = {
  -readonly [P in K]: C extends (key: P, value: T[P]) => infer R ? R : T[P];
};

export type Omitted<
  T extends object,
  K extends keyof T,
  C extends ((key: K, value: T[K]) => any) | undefined = undefined
> = {
  -readonly [P in Exclude<keyof T, K>]: C extends (
    key: P,
    value: T[P]
  ) => infer R
    ? R
    : T[P];
};
