import { isArray } from "@auaust/primitive-kit/arrays";

import { describe, expect, it } from "vitest";

describe("isArray()", () => {
  it("should work", () => {
    expect(isArray).toBeTypeOf("function");
  });
});
