import { toFunction } from "@auaust/primitive-kit/functions";

import { describe, expect, it } from "vitest";

describe("toFunction()", () => {
  it("should return the passed argument if it is a function", () => {
    const fn = () => {};
    expect(toFunction(fn)).toBe(fn);
  });

  it("should return a function that returns the passed argument if it is not a function", () => {
    expect(toFunction(1)()).toBe(1);
    expect(toFunction("string")()).toBe("string");
    expect(toFunction(undefined)()).toBe(undefined);
    expect(toFunction(null)()).toBe(null);
  });
});
