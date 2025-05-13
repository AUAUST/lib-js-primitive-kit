import { toNumber } from "@auaust/primitive-kit/numbers";

import { describe, expect, it } from "vitest";

describe("toNumber()", () => {
  it("should work", () => {
    expect(toNumber).toBeTypeOf("function");
  });
});
