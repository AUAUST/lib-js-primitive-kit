import { P } from "@auaust/primitive-kit";

import { describe, expect, test } from "vitest";

describe("The P class", () => {
  test("exposes static methods", () => {
    expect(P.isPrimitive).toBeTypeOf("function");
  });

  test("can be instantiated", () => {
    const p = new P(null);

    expect(p).toBeInstanceOf(P);
  });

  test("has a static make() method that returns an instance of P", () => {
    const p = P.make(null);

    expect(p).toBeInstanceOf(P);
  });

  test("has a static from() method that converts a value to a primitive", () => {
    const p = P.from(null);

    expect(p).toBe(null);
  });

  test("can be called as a function to convert a value to a primitive", () => {
    const p = P(null);

    expect(p).toBe(null);
  });

  test("can be called as a function to create a primitive from various values", () => {
    expect(P(null)).toBe(null);
    expect(P(1)).toBe(1);
    expect(P("foo")).toBe("foo");
    expect(P(0)).toBe(0);
    expect(P(false)).toBe(false);
    expect(P(undefined)).toBe(null);
  });
});
