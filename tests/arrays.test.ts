import { a, A } from "@auaust/primitive-kit";

import type { Equal, Expect } from "type-testing";
import { assert, describe, expect, test } from "vitest";

describe("The A class", () => {
  test("exposes static methods", () => {
    expect(A.collapse).toBeTypeOf("function");

    expect(A.isArray).toBeTypeOf("function");
  });

  test("can be instantiated", () => {
    const a = new A([1, 2, 3]);

    expect(a).toBeInstanceOf(A);
  });

  test("has a static make() method that returns an instance of A", () => {
    const a = A.make([1, 2, 3]);

    expect(a).toBeInstanceOf(A);
  });

  test("has a static from() method that converts an array-like object to an array", () => {
    const arrayLike = { 0: "a", 1: "b", length: 2 };

    const a = A.from(arrayLike);

    assert(Array.isArray(a));

    expect(a).toEqual(["a", "b"]);
  });

  test("can be called as a function to create an array", () => {
    const a = A([1, 2, 3]);

    assert(Array.isArray(a));

    expect(a).toEqual([1, 2, 3]);
  });
});

describe("The a() helper", () => {
  test("instantiates an A instance", () => {
    const array = a([1, 2, 3]);

    expect(array).toBeInstanceOf(A);
  });

  test("supports chaining", () => {
    const one = a([1, 2, 3]).reverse().last();

    expect(one).toBe(1);
  });

  test("preserves overloaded instance methods", () => {
    const array = a([1, 2, 3]);

    const every = array.every((value) => value > 0);

    const mapped = array.map((value) => value * 2);

    const strings = array.map("toPrecision", 3);

    type Tests = [
      Expect<Equal<typeof every, boolean>>,
      Expect<Equal<typeof mapped.value, number[]>>,
      Expect<Equal<typeof strings.value, string[]>>,
    ];

    expect(every).toBe(true);

    expect(mapped.value).toEqual([2, 4, 6]);

    expect(strings.value).toEqual(["1.00", "2.00", "3.00"]);
  });

  test("supports map's method-name overload", () => {
    const mapped = a([1, "hello", null]).map("toUpperCase");

    type Test = Expect<Equal<typeof mapped.value, (string | undefined)[]>>;

    expect(mapped.value).toEqual([undefined, "HELLO", undefined]);
  });
});
