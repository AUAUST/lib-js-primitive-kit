import { N } from "@auaust/primitive-kit";

import { describe, expect, test } from "vitest";

describe("The N class", () => {
  test("exposes static methods", () => {
    expect(N.isNumber).toBeTypeOf("function");
  });

  test("can be instantiated", () => {
    const n = new N(42);

    expect(n).toBeInstanceOf(N);
  });

  test("has a static make() method that returns an instance of N", () => {
    const n = N.make(42);

    expect(n).toBeInstanceOf(N);
  });

  test("has a static from() method that converts a value to a number", () => {
    expect(N.from(42)).toBe(42);
    expect(N.from("42")).toBe(42);
    expect(N.from(true)).toBe(1);
    expect(N.from(false)).toBe(0);
  });

  test("can be called as a function to convert a value to a number", () => {
    expect(N(42)).toBe(42);
    expect(N("42")).toBe(42);
    expect(N(true)).toBe(1);
    expect(N(false)).toBe(0);
  });
});
