import { and } from "@auaust/primitive-kit/booleans";

import { describe, expect, it } from "vitest";

describe("and()", () => {
  it("should work", () => {
    expect(and(true, true)).toBe(true);
    expect(and(true, false)).toBe(false);
    expect(and(false, true)).toBe(false);
    expect(and(false, false)).toBe(false);

    expect(and("false", "true")).toBe(false);
    expect(and("true", "false")).toBe(false);
    expect(and("true", "true")).toBe(true);
    expect(and("false", "false")).toBe(false);
  });
});
