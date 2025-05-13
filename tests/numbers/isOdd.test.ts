import { isOdd } from "@auaust/primitive-kit/numbers";

import { describe, expect, it } from "vitest";

describe("isOdd()", () => {
  it("should work", () => {
    expect(isOdd).toBeTypeOf("function");
  });
});
