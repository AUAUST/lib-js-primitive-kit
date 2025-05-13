import { isPositive } from "@auaust/primitive-kit/numbers";

import { describe, expect, it } from "vitest";

describe("isPositive()", () => {
  it("should work", () => {
    expect(isPositive).toBeTypeOf("function");
  });
});
