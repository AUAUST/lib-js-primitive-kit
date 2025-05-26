import { isPrimitive } from "@auaust/primitive-kit/primitives";

import { describe, expect, it } from "vitest";

describe("isPrimitive()", () => {
  it("should work", () => {
    expect(isPrimitive("string")).toBe(true);
    expect(isPrimitive(0)).toBe(true);
    expect(isPrimitive(false)).toBe(true);

    expect(isPrimitive(new String("string"))).toBe(false);
    expect(isPrimitive(new Number(0))).toBe(false);
    expect(isPrimitive(new Boolean(false))).toBe(false);

    expect(isPrimitive({})).toBe(false);
    expect(isPrimitive([])).toBe(false);
    expect(isPrimitive(null)).toBe(false);
    expect(isPrimitive(undefined)).toBe(false);
    expect(isPrimitive(() => {})).toBe(false);
  });
});
