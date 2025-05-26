import { or } from "@auaust/primitive-kit/booleans";

import { describe, expect, it } from "vitest";

describe("or()", () => {
  it("should work", () => {
    expect(or(true, true)).toBe(true);
    expect(or(true, false)).toBe(true);
    expect(or(false, true)).toBe(true);
    expect(or(false, false)).toBe(false);

    expect(or("false", false)).toBe(false);
  });
});
