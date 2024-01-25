import { F } from "~/Function";

import { describe, expect, jest, test } from "@jest/globals";

describe("B class", () => {
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

  test("try() works", () => {
    expect(F.try(() => 1)).toBe(1);
    expect(F.try(() => undefined)).toBe(undefined);
    expect(F.try(() => false)).toBe(false);
    expect(F.try(() => new Error())).toBeInstanceOf(Error);

    const fn = jest.fn(() => {
      throw new Error("foo");
    });

    expect(F.try(fn)).toBeInstanceOf(Error);

    // @ts-expect-error
    F.try(fn, 1, 2, 3, 4);
    expect(fn).toHaveBeenLastCalledWith(1, 2, 3, 4);

    // throwing non-error should still convert it to an error
    expect(
      F.try(() => {
        throw "foo";
      })
    ).toEqual(new Error("foo"));
  });
});
