import { multiply } from "@auaust/primitive-kit/numbers";

import { describe, expect, it } from "vitest";

describe("multiply()", () => {
  it("should work", () => {
    expect(multiply).toBeTypeOf("function");
  });
});
