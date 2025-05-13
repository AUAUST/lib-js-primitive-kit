import { isNullish } from "@auaust/primitive-kit/primitives";

import { describe, expect, it } from "vitest";

describe("isNullish()", () => {
  it("should work", () => {
    expect(isNullish).toBeTypeOf("function");
  });
});
