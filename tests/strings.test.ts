import { s, S } from "@auaust/primitive-kit";

import { describe, expect, test } from "vitest";

describe("The S class", () => {
  test("exposes static methods", () => {
    expect(S.isString).toBeTypeOf("function");
  });

  test("can be instantiated", () => {
    const s = new S("foo");

    expect(s).toBeInstanceOf(S);
  });

  test("has a static make() method that returns an instance of S", () => {
    const s = S.make("foo");

    expect(s).toBeInstanceOf(S);
  });

  test("has a static from() method that converts a value to a string", () => {
    expect(S.from("foo")).toBe("foo");
    expect(S.from(42)).toBe("42");
    expect(S.from(true)).toBe("true");
    expect(S.from(false)).toBe("false");
  });

  test("can be called as a function to convert a value to a string", () => {
    expect(S("foo")).toBe("foo");
    expect(S(42)).toBe("42");
    expect(S(true)).toBe("true");
    expect(S(false)).toBe("false");
  });
});

describe("S instances", () => {
  test("have method aliases", () => {
    const str = new S("foo");

    expect(str.toUpperCase).toBe(str.upper);

    expect(s("foo.bar").after(".")).toEqual(new S("foo.bar").afterFirst("."));

    expect(S.make("foo.bar").after(".").toString()).toBe("bar");
  });
});
