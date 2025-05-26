import { F } from "@auaust/primitive-kit";

import { describe, expect, test, vitest } from "vitest";

describe("F class", () => {
  test("called as a function works", () => {
    expect(F()).toBeTypeOf("function");
    expect(F()()).toBe(undefined);
    expect(F(1)()).toBe(1);

    const fn = () => {};

    expect(F(fn)).toBe(fn);
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
});
