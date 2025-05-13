import { isNegative } from "@auaust/primitive-kit/numbers";

import { describe, expect, it } from "vitest";

describe("isNegative()", () => {
  it("should work", () => {
    expect(isNegative).toBeTypeOf("function");
  });
});
