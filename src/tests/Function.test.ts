import { F } from "~/functions";

import { describe, expect, test, vitest } from "vitest";

describe("F class", () => {
  test("typecheck works", () => {
    expect(F.is(() => {})).toBe(true);
    expect(F.is(function () {})).toBe(true);
    expect(F.is(async () => {})).toBe(true);
    expect(F.is(function* () {})).toBe(true);
    expect(F.is(class {})).toBe(true);

    expect(F.is("")).toBe(false);
    expect(F.is(0)).toBe(false);
    expect(F.is(true)).toBe(false);
    expect(F.is({})).toBe(false);
    expect(F.is([])).toBe(false);
    expect(F.is(null)).toBe(false);
    expect(F.is(undefined)).toBe(false);
  });

  test("async check works", () => {
    expect(F.isAsync(async () => {})).toBe(true);

    expect(F.isAsync(() => {})).toBe(false);
    expect(F.isAsync(function* () {})).toBe(false);
    expect(F.isAsync(class {})).toBe(false);
  });

  test("generator check works", () => {
    expect(F.isGenerator(function* () {})).toBe(true);

    expect(F.isGenerator(() => {})).toBe(false);
    expect(F.isGenerator(async () => {})).toBe(false);
    expect(F.isGenerator(class {})).toBe(false);
  });

  test("async generator check works", () => {
    expect(F.isAsyncGenerator(async function* () {})).toBe(true);

    expect(F.isAsyncGenerator(() => {})).toBe(false);
    expect(F.isAsyncGenerator(function* () {})).toBe(false);
    expect(F.isAsyncGenerator(class {})).toBe(false);
  });

  describe("try() works", () => {
    test("when arguments are passed", () => {
      const fn = vitest.fn((...args: number[]) => {
        return args.reduce((a, b) => a + b, 0);
      });

      // If the return value is correct, it means the function was called with the correct arguments.
      expect(F.try(fn, undefined, 1, 2, 3, 4)).toBe(10);
      expect(fn).toHaveBeenLastCalledWith(1, 2, 3, 4);
    });

    test("when the function does not throw", () => {
      expect(F.try(() => 1)).toBe(1);
      expect(F.try(() => undefined)).toBe(undefined);
      expect(F.try(() => false)).toBe(false);
      expect(F.try(() => new Error())).toBeInstanceOf(Error);
      expect(F.try(() => {})).toBe(undefined);
    });

    test("when the function throws", () => {
      expect(
        F.try(() => {
          throw new Error();
        })
      ).toBe(undefined);
      expect(
        F.try(() => {
          throw new Error();
        }, 1)
      ).toBe(1);
    });
  });

  describe("tryAsync() works", () => {
    test("when arguments are passed", async () => {
      const fn = vitest.fn(async (...args: number[]) => {
        return args.reduce((a, b) => a + b, 0);
      });

      // If the return value is correct, it means the function was called with the correct arguments.
      expect(await F.tryAsync(fn, undefined, 1, 2, 3, 4)).toBe(10);
      expect(fn).toHaveBeenLastCalledWith(1, 2, 3, 4);
    });

    test("when the function does not throw", async () => {
      expect(await F.tryAsync(async () => 1)).toBe(1);
      expect(await F.tryAsync(async () => undefined)).toBe(undefined);
      expect(await F.tryAsync(async () => false)).toBe(false);
      expect(await F.tryAsync(async () => new Error())).toBeInstanceOf(Error);
      expect(await F.tryAsync(async () => {})).toBe(undefined);
    });

    test("when the function throws", async () => {
      expect(
        await F.tryAsync(async () => {
          throw new Error();
        })
      ).toBe(undefined);
      expect(
        await F.tryAsync(async () => {
          throw new Error();
        }, 1)
      ).toBe(1);
    });
  });

  test("call() works", () => {
    const fn = vitest.fn((...args: number[]) => {
      return args.reduce((a, b) => a + b, 0);
    });

    expect(F.call(fn, undefined, 1, 2, 3, 4)).toBe(10);
    expect(fn).toHaveBeenLastCalledWith(1, 2, 3, 4);

    expect(F.call(() => 1)).toBe(1);
    expect(F.call(() => undefined)).toBe(undefined);
    expect(F.call(() => {})).toBe(undefined);

    expect(F.call("", "fallback", 1, 2, 3, 4)).toBe("fallback");
    expect(F.call({}, "fallback", 1, 2, 3, 4)).toBe("fallback");
  });
});
