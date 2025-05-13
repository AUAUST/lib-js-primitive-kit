import { abs } from "@auaust/primitive-kit/numbers";

import { describe, expect, it } from "vitest";

describe("abs()", () => {
  it("should work", () => {
    expect(abs).toBeTypeOf("function");
  });
});
