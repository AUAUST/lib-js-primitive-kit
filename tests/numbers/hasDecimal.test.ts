import { hasDecimal } from "@auaust/primitive-kit/numbers";

import { describe, expect, it } from "vitest";

describe("hasDecimal()", () => {
  it("should work", () => {
    expect(hasDecimal).toBeTypeOf("function");
  });
});
