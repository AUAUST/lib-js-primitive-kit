import { A } from "@auaust/primitive-kit";

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
