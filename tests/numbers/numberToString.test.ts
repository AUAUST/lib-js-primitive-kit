import { numberToString } from "@auaust/primitive-kit/numbers";

import { describe, expect, it } from "vitest";

describe("numberToString()", () => {
  it("should work", () => {
    expect(numberToString).toBeTypeOf("function");
  });
});
