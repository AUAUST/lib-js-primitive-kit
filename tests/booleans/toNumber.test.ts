import { toNumber } from "@auaust/primitive-kit/booleans";

import { describe, expect, it } from "vitest";

describe("toNumber()", () => {
  it("should work", () => {
    expect(toNumber).toBeTypeOf("function");
  });
});
