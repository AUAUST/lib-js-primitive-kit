import { B } from "@auaust/primitive-kit";

import { describe, expect, test } from "vitest";

describe("The B class", () => {
  test("exposes static methods", () => {
    expect(B.isBoolean).toBeTypeOf("function");
  });

  test("can be instantiated", () => {
    const b = new B(true);

    expect(b).toBeInstanceOf(B);
  });

  test("has a static make() method that returns an instance of B", () => {
    const b = B.make(true);

    expect(b).toBeInstanceOf(B);
  });

  test("has a static from() method that converts a value to a boolean", () => {
    expect(B.from(true)).toBe(true);
    expect(B.from(false)).toBe(false);
    expect(B.from(1)).toBe(true);
    expect(B.from(0)).toBe(false);
    expect(B.from("true")).toBe(true);
    expect(B.from("false")).toBe(false);
  });

  test("can be called as a function to evaluate truthiness", () => {
    expect(B()).toBe(false);
    expect(B(1)).toBe(true);
    expect(B("")).toBe(false);
    expect(B("false")).toBe(false);
  });
});
