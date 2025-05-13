import { isEven } from "@auaust/primitive-kit/numbers";

import { describe, expect, it } from "vitest";

describe("isEven()", () => {
  it("should work", () => {
    expect(isEven).toBeTypeOf("function");
  });
});
