import { equals } from "@auaust/primitive-kit/booleans";

import { describe, expect, it } from "vitest";

describe("equals()", () => {
  it("should work", () => {
    expect(equals(true, true)).toBe(true);
    expect(equals(true, false)).toBe(false);

    expect(equals("true", true)).toBe(true);
    expect(equals("true", false)).toBe(false);
    expect(equals("false", new Boolean(false))).toBe(true);

    expect(equals("", new String("false"))).toBe(true);
  });
});
