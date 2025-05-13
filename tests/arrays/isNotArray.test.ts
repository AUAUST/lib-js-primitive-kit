import { isNotArray } from "@auaust/primitive-kit/arrays";

import { describe, expect, it } from "vitest";

describe("isNotArray()", () => {
  it("should work", () => {
    expect(isNotArray).toBeTypeOf("function");
  });
});
