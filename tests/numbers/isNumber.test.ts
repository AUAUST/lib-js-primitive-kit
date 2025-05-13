import { isNumber } from "@auaust/primitive-kit/numbers";

import { describe, expect, it } from "vitest";

describe("isNumber()", () => {
  it("should work", () => {
    expect(isNumber).toBeTypeOf("function");
  });
});
