import { tryCatch } from "@auaust/primitive-kit/functions";

import { describe, expect, it, vitest } from "vitest";

describe("tryCatch()", () => {
  it("should forward the arguments to the function", () => {
    const fn = vitest.fn((...args: number[]) => {
      return args.reduce((a, b) => a + b, 0);
    });

    expect(tryCatch(fn, undefined, 1, 2, 3, 4)).toBe(10);
    expect(fn).toHaveBeenLastCalledWith(1, 2, 3, 4);
  });

  it("should return the result of the function when it does not throw", () => {
    expect(tryCatch(() => 1)).toBe(1);
    expect(tryCatch(() => undefined)).toBe(undefined);
    expect(tryCatch(() => false)).toBe(false);
    expect(tryCatch(() => new Error())).toBeInstanceOf(Error);
    expect(tryCatch(() => {})).toBe(undefined);
  });

  it("should return the fallback value when the function throws", () => {
    expect(
      tryCatch(() => {
        throw new Error();
      })
    ).toBe(undefined);

    expect(
      tryCatch(() => {
        throw new Error();
      }, 1)
    ).toBe(1);
  });
});
