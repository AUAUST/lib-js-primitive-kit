import { formatNumber } from "@auaust/primitive-kit/numbers";

import { describe, expect, it } from "vitest";

describe("formatNumber()", () => {
  it("should work", () => {
    expect(formatNumber).toBeTypeOf("function");
  });
});
