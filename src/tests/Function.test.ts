import { F } from "~/Function";

import { describe, expect, jest, test } from "@jest/globals";

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
    // @ts-expect-error
    expect(F.isAsync(class {})).toBe(false);
  });

  test("generator check works", () => {
    expect(F.isGenerator(function* () {})).toBe(true);

    expect(F.isGenerator(() => {})).toBe(false);
    expect(F.isGenerator(async () => {})).toBe(false);
    // @ts-expect-error
    expect(F.isGenerator(class {})).toBe(false);
  });

  describe("try() works", () => {
    test("when arguments are passed", () => {
      const fn = jest.fn((...args: number[]) => {
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
});
