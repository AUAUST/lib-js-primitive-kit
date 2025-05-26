import { isObject } from "@auaust/primitive-kit/primitives";

import { describe, expect, it } from "vitest";

describe("isObject()", () => {
  it("should work", () => {
    expect(isObject({})).toBe(true);
    expect(isObject([])).toBe(true);
    expect(isObject(new String("foo"))).toBe(true);
    expect(isObject(new Number(0))).toBe(true);
    expect(isObject(new Boolean(false))).toBe(true);
    expect(isObject(() => {})).toBe(true);

    expect(isObject(null)).toBe(false);
    expect(isObject(undefined)).toBe(false);
    expect(isObject(0)).toBe(false);
    expect(isObject(false)).toBe(false);
    expect(isObject("")).toBe(false);
  });
});
