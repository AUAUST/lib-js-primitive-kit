import { isBetween } from "@auaust/primitive-kit/numbers";

import { describe, expect, it } from "vitest";

describe("isBetween()", () => {
  it("should work", () => {
    expect(isBetween).toBeTypeOf("function");
  });
});
