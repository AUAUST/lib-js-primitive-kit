import { isStrictArray } from "@auaust/primitive-kit/arrays";

import { describe, expect, it } from "vitest";

describe("isStrictArray()", () => {
  it("should work", () => {
    expect(isStrictArray).toBeTypeOf("function");
  });
});
