import type { Fn } from "~/functions/types";

/**
 * The primitive produced by converting a value with `toPrimitive()`.
 */
export type ToPrimitive<T> = T extends number | string | boolean
  ? T
  : T extends Number | String | Boolean
    ? ReturnType<T["valueOf"]>
    : T extends null | undefined
      ? null
      : T extends symbol | Fn
        ? undefined
        : T extends { [Symbol.toPrimitive](): infer U }
          ? U
          : T extends { valueOf(): infer U }
            ? U
            : T extends { toString(): infer U }
              ? U
              : undefined;
