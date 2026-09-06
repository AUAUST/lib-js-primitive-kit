import { pluck } from "@auaust/primitive-kit/arrays";

import { describe, expect, it } from "vitest";

describe("pluck()", () => {
  it("should work", () => {
    expect(pluck).toBeTypeOf("function");
  });

  it("should pluck values correctly", () => {
    const arr = [
      { a: 1, b: 2 },
      { a: 3, b: 4 },
    ];

    expect(pluck(arr, "a")).toEqual([1, 3]);
    expect(pluck(arr, "b")).toEqual([2, 4]);
  });

  it("should use undefined for missing keys", () => {
    const arr = [
      { a: 1, b: 2 },
      { a: 3, b: 4 },
      { a: 5, b: 6, c: 7 },
    ];

    expect(pluck(arr, "c")).toEqual([undefined, undefined, 7]);
  });
});
