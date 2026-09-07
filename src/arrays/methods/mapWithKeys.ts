import type { Arrayable, ArrayValue } from "~/arrays/types";
import { defineMethod } from "~/compiler";
import type { Fn } from "~/functions/types";
import { isArray } from "./isArray";
import { toArray, type ToArray } from "./toArray";

export default defineMethod({
  instanceCallable: true,
});

export type MappedValue =
  | readonly [PropertyKey, unknown]
  | Readonly<Record<PropertyKey, unknown>>
  | false
  | null
  | undefined;

export type MappedKeys<Result> = Result extends false | null | undefined
  ? never
  : Result extends readonly [infer Key extends PropertyKey, unknown]
    ? Key
    : Result extends object
      ? keyof Result
      : never;

type PropertyValues<Value> = Value extends object ? Value[keyof Value] : never;

type ValuesMatchingKey<Value, Key extends PropertyKey> = Value extends unknown
  ? Key extends PropertyValues<Value>
    ? Value
    : never
  : never;

type EntryValueAt<
  EntryKey extends PropertyKey,
  Value,
  Key extends PropertyKey,
> = Key extends EntryKey
  ? [ValuesMatchingKey<Value, Key>] extends [never]
    ? Value
    : ValuesMatchingKey<Value, Key>
  : never;

type MappedValueAt<Result, Key extends PropertyKey> = Result extends unknown
  ? Result extends readonly [infer EntryKey extends PropertyKey, infer Value]
    ? EntryValueAt<EntryKey, Value, Key>
    : Result extends object
      ? Key extends keyof Result
        ? Result[Key]
        : never
      : never
  : never;

export type MapWithKeysResult<Result> = {
  [K in MappedKeys<Result>]: MappedValueAt<Result, K>;
} extends infer M
  ? {
      [K in keyof M]: M[K];
    }
  : never;

export function mapWithKeys<
  const T extends Arrayable,
  const Result extends MappedValue,
  This = undefined,
>(
  array: T,
  callback: (
    this: This,
    value: ArrayValue<T>,
    index: number,
    array: ToArray<T>,
  ) => Result,
  thisArg?: This,
): MapWithKeysResult<Result>;
export function mapWithKeys(array: Arrayable, callback: Fn, thisArg?: any) {
  return toArray(array).reduce((acc, value, index, arr) => {
    const result = callback.call(thisArg, value, index, arr);

    if (isArray(result)) {
      const [key, value] = result;
      acc[key] = value;
    } else if (result) {
      Object.assign(acc, result);
    }

    return acc;
  }, {});
}
