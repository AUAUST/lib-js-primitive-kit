import { isPropertyKey } from "@auaust/primitive-kit/primitives";

import { describe, expect, it } from "vitest";

describe("isPropertyKey()", () => {
  it("should work", () => {
    expect(isPropertyKey).toBeTypeOf("function");
  });
});
