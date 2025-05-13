import { isInteger } from "@auaust/primitive-kit/numbers";

import { describe, expect, it } from "vitest";

describe("isInteger()", () => {
  it("should work", () => {
    expect(isInteger).toBeTypeOf("function");
  });
});
