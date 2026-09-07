/**
 * Most of these types are copied from type-fest.
 */

/** A generic object with configurable key and value types. */
export type GenericRecord<
  Key extends PropertyKey = string | symbol,
  Value = unknown,
> = Record<Key, Value>;

/** Makes the top-level properties of a type writable. */
export type Writable<T> = { -readonly [Key in keyof T]: T[Key] };

/** Makes all properties in a type recursively writable. */
export type WritableRecursive<T> = {
  -readonly [Key in keyof T]: WritableRecursive<T[Key]>;
};

export type IsNull<T> = [T] extends [null] ? true : false;

export type IsNever<T> = [T] extends [never] ? true : false;

export type IfNever<T, TypeIfNever = true, TypeIfNotNever = false> =
  IsNever<T> extends true ? TypeIfNever : TypeIfNotNever;

export type IsUnknown<T> = unknown extends T // `T` can be `unknown` or `any`
  ? IsNull<T> extends false // `any` can be `null`, but `unknown` can't be
    ? true
    : false
  : false;

export type IfUnknown<T, TypeIfUnknown = true, TypeIfNotUnknown = false> =
  IsUnknown<T> extends true ? TypeIfUnknown : TypeIfNotUnknown;

/**
 * Selects a fallback type when the input is `undefined`, `never`, or
 * `unknown`.
 */
export type IfUncertain<T, TypeIfUncertain, TypeIfCertain> = IfNever<
  T,
  TypeIfUncertain,
  IfUnknown<
    T,
    TypeIfUncertain,
    IsEqual<T, undefined> extends true ? TypeIfUncertain : TypeIfCertain
  >
>;

export type IsEqual<A, B> =
  (<G>() => G extends (A & G) | G ? 1 : 2) extends <G>() => G extends
    | (B & G)
    | G
    ? 1
    : 2
    ? true
    : false;

export type UnionToIntersection<Union> = (
  Union extends unknown ? (distributedUnion: Union) => void : never
) extends (mergedIntersection: infer Intersection) => void
  ? Intersection & Union
  : never;
