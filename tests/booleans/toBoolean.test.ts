import { toBoolean } from "@auaust/primitive-kit/booleans";

import { describe, expect, it } from "vitest";

describe("toBoolean()", () => {
  it("should work", () => {
    expect(toBoolean(new String(""))).toBe(false);
    expect(toBoolean(new Number(0))).toBe(false);
    expect(toBoolean(new Boolean(false))).toBe(false);

    expect(toBoolean("")).toBe(false);
    expect(toBoolean(0)).toBe(false);
    expect(toBoolean(false)).toBe(false);
    expect(toBoolean("false")).toBe(false);
    expect(toBoolean("0")).toBe(false);
    expect(toBoolean(" \r\n")).toBe(false);
    expect(toBoolean(null)).toBe(false);
    expect(toBoolean(undefined)).toBe(false);
    expect(toBoolean(NaN)).toBe(false);

    expect(toBoolean("foo")).toBe(true);
    expect(toBoolean(1)).toBe(true);
    expect(toBoolean({})).toBe(true);
    expect(toBoolean([])).toBe(true);
  });
});
