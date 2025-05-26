import { tryCatchAsync } from "@auaust/primitive-kit/functions";

import { describe, expect, it, vitest } from "vitest";

describe("tryCatchAsync()", () => {
  it("should forward the arguments to the function", async () => {
    const fn = vitest.fn(async (...args: number[]) => {
      return args.reduce((a, b) => a + b, 0);
    });

    expect(await tryCatchAsync(fn, undefined, 1, 2, 3, 4)).toBe(10);
    expect(fn).toHaveBeenLastCalledWith(1, 2, 3, 4);
  });

  it("should resolve with the result of the function when it does not throw", async () => {
    expect(await tryCatchAsync(async () => 1)).toBe(1);
    expect(await tryCatchAsync(async () => undefined)).toBe(undefined);
    expect(await tryCatchAsync(async () => false)).toBe(false);
    expect(await tryCatchAsync(async () => new Error())).toBeInstanceOf(Error);
    expect(await tryCatchAsync(async () => {})).toBe(undefined);
  });

  it("should resolve with the fallback value when the function throws", async () => {
    expect(
      await tryCatchAsync(async () => {
        throw new Error();
      })
    ).toBe(undefined);

    expect(
      await tryCatchAsync(async () => {
        throw new Error();
      }, 1)
    ).toBe(1);
  });
});
