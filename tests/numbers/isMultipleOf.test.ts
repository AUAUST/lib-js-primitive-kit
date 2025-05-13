import { isMultipleOf } from "@auaust/primitive-kit/numbers";

import { describe, expect, it } from "vitest";

describe("isMultipleOf()", () => {
  it("should work", () => {
    expect(isMultipleOf).toBeTypeOf("function");
  });
});
