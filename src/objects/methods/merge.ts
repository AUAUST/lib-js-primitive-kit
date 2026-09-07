import { defineMethod } from "~/compiler";
import type { GenericRecord } from "~/shared/types";

export default defineMethod({
  instanceCallable: "chainable",
});

type ExtractRequired<T> = {
  [K in keyof T as undefined extends T[K] ? never : K]: T[K];
};

export type Merge<O extends GenericRecord[]> = O extends [...infer F, infer R]
  ? F extends GenericRecord[]
    ? Merge<F> extends infer M
      ? {
          [K in keyof R | keyof M]: K extends keyof ExtractRequired<R>
            ? R[K]
            : K extends keyof R
              ? K extends keyof M
                ? R[K] | M[K]
                : R[K]
              : K extends keyof M
                ? M[K]
                : never;
        }
      : never
    : R
  : {};

export function merge<
  const T extends GenericRecord,
  const U extends GenericRecord[],
>(object: T, ...sources: U): Merge<[T, ...U]>;
export function merge(...objects: unknown[]): GenericRecord;
export function merge(...objects: unknown[]): GenericRecord {
  return Object.assign({}, ...objects);
}
