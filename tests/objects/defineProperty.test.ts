import { defineProperty } from "@auaust/primitive-kit/objects";

import { describe, expect, it } from "vitest";

describe("defineProperty()", () => {
  it("should work", () => {
    expect(defineProperty).toBeTypeOf("function");
  });
});
