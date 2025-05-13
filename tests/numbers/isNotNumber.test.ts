import { isNotNumber } from "@auaust/primitive-kit/numbers";

import { describe, expect, it } from "vitest";

describe("isNotNumber()", () => {
  it("should work", () => {
    expect(isNotNumber).toBeTypeOf("function");
  });
});
