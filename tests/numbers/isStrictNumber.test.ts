import { isStrictNumber } from "@auaust/primitive-kit/numbers";

import { describe, expect, it } from "vitest";

describe("isStrictNumber()", () => {
  it("should work", () => {
    expect(isStrictNumber).toBeTypeOf("function");
  });
});
