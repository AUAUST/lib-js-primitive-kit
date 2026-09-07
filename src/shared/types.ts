/**
 * Most of these types are copied from type-fest.
 */

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
