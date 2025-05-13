import { toPrimitive } from "@auaust/primitive-kit/primitives";

import { describe, expect, it } from "vitest";

describe("toPrimitive()", () => {
  it("should work", () => {
    expect(toPrimitive).toBeTypeOf("function");
  });
});
