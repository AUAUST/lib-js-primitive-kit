import { random } from "@auaust/primitive-kit/booleans";

import { describe, expect, it } from "vitest";

describe("random()", () => {
  it("should work", () => {
    expect(random()).toBeTypeOf("boolean");
    expect(random(0)).toBe(false);
    expect(random(1)).toBe(true);
    expect(random(0.5)).toBeTypeOf("boolean");
  });
});
