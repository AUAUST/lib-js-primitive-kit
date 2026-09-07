import type {
  GenericRecord as SharedGenericRecord,
  IfNever,
  Writable as SharedWritable,
  WritableRecursive as SharedWritableRecursive,
} from "~/shared/types";

/**
 * Represents a generic object type with unknown properties of unknown type.
 */
export type GenericRecord<
  P extends PropertyKey = string | symbol,
  V = unknown,
> = SharedGenericRecord<P, V>;

/**
 * The object produced by converting a value with `toObject()`.
 */
export type ToObject<T> = T extends null | undefined
  ? GenericRecord<string>
  : T extends GenericRecord
    ? T
    : T extends readonly (infer R)[]
      ? { [K: `${number}`]: IfNever<R, unknown, R> }
      : T extends number
        ? Number
        : T extends string
          ? String
          : T extends boolean
            ? Boolean
            : T extends object
              ? T
              : Object;

/** The value exposed by a property descriptor. */
export type PropertyDescriptorType<T extends PropertyDescriptor> = T extends {
  value: infer V;
}
  ? V
  : T extends { get(): infer G }
    ? G
    : T extends { set(): infer S }
      ? S
      : unknown;

/**
 * Makes the properties writable.
 */
export type Writable<T> = SharedWritable<T>;

export type WritableRecursive<T> = SharedWritableRecursive<T>;

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

type WithStringKeys<
  O extends readonly PropertyKey[] | HasKeysOptions | undefined,
> = O extends readonly PropertyKey[]
  ? { [K in O[number]]: unknown }
  : O extends HasKeysOptions & { keys: PropertyKey[] }
    ? { [K in O["keys"][number]]: unknown }
    : {};

type WithSymbols<
  O extends readonly PropertyKey[] | HasKeysOptions | undefined,
> = O extends HasKeysOptions
  ? O["symbols"] extends true
    ? { [K in symbol]: unknown }
    : {}
  : {};

export type WithKeys<
  O extends readonly PropertyKey[] | HasKeysOptions | undefined,
> = O extends undefined
  ? {
      [k: string]: unknown;
    }
  : WithStringKeys<O> & WithSymbols<O>;
