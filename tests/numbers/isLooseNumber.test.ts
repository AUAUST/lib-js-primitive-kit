import { isLooseNumber } from "@auaust/primitive-kit/numbers";

import { describe, expect, it } from "vitest";

describe("isLooseNumber()", () => {
  it("should work", () => {
    expect(isLooseNumber).toBeTypeOf("function");
  });
});
