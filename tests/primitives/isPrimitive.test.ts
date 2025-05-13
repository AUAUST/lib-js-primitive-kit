import { isPrimitive } from "@auaust/primitive-kit/primitives";

import { describe, expect, it } from "vitest";

describe("isPrimitive()", () => {
  it("should work", () => {
    expect(isPrimitive).toBeTypeOf("function");
  });
});
