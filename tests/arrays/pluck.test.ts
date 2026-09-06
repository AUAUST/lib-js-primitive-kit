import { pluck } from "@auaust/primitive-kit/arrays";

import { describe, expect, it } from "vitest";
import { Equal, Expect } from "type-testing";
import { test } from "vitest";

describe("pluck()", () => {
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

test("pluck() works", () => {
  const input = [
    {
      foo: 1,
      bar: 2,
    },
    {
      foo: 3,
      bar: 4,
      baz: 5,
    },
    {
      bar: "XXX",
    },
    {
      foo: "YYY",
      bar: null,
    },
  ];

  const partial = pluck(input, "foo");
  expect(partial).toEqual([1, 3, undefined, "YYY"]);

  const everywhere = pluck(input, "bar");
  expect(everywhere).toEqual([2, 4, "XXX", null]);

  expect(pluck(input, "baz")).toEqual([undefined, 5, undefined, undefined]);

  type Tests = [
    Expect<Equal<typeof partial, (number | string | undefined)[]>>,
    Expect<Equal<typeof everywhere, (string | number | null)[]>>
  ];
});
