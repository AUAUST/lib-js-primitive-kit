import { F } from "@auaust/primitive-kit";

import { describe, expect, test } from "vitest";

describe("The F class", () => {
  test("exposes static methods", () => {
    expect(F).toBeTypeOf("function");
  });

  test("can be instantiated", () => {
    const f = new F(null);

    expect(f).toBeInstanceOf(F);
  });

  test("has a static make() method that returns an instance of F", () => {
    const f = F.make(null);

    expect(f).toBeInstanceOf(F);
  });

  test("has a static from() method that converts a value to a function", () => {
    const f = F.from(null);

    expect(f).toBeTypeOf("function");
  });

  test("can be called as a function to create a function", () => {
    const f = F(null);

    expect(f).toBeTypeOf("function");
  });
});
