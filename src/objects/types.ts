import type { IfNever } from "type-fest";

/**
 * Represents a generic object type with unknown properties of unknown type.
 */
export type ObjectType<
  P extends PropertyKey = PropertyKey,
  V = unknown
> = Record<P, V>;

/**
 * Makes the properties writable.
 */
export type Writable<T> = {
  -readonly [P in keyof T]: T[P];
};

export type WritableRecursive<T> = {
  -readonly [P in keyof T]: WritableRecursive<T[P]>;
};

export type GetDeepValues<T> = T extends object
  ? { [K in keyof T]: DeepValues<T[K]> }[keyof T]
  : T;

export type DeepValues<T> = IfNever<
  GetDeepValues<T>,
  unknown,
  GetDeepValues<T>
>;

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
