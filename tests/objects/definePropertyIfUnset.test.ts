import { definePropertyIfUnset } from "@auaust/primitive-kit/objects";

import { describe, expect, it } from "vitest";

describe("definePropertyIfUnset()", () => {
  it("should work", () => {
    expect(definePropertyIfUnset).toBeTypeOf("function");
  });
});
