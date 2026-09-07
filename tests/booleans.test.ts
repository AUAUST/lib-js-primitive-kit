import { b, B } from "@auaust/primitive-kit";

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

describe("The b() helper", () => {
  test("instantiates a B instance", () => {
    const bool = b(true);

    expect(bool).toBeInstanceOf(B);
  });
});

describe("B instances", () => {
  test("evaluates truthiness correctly", () => {
    expect(new B("FALSE").valueOf()).toBe(false);

    expect(b("False").or(true)).toBe(true);

    expect(b("False").nor(0)).toBe(true);

    expect(b(1).xor(b(0))).toBe(true);
  });
});
