import { toFixed } from "@auaust/primitive-kit/numbers";

import { describe, expect, it } from "vitest";

describe("toFixed()", () => {
  it("should work", () => {
    expect(toFixed).toBeTypeOf("function");
  });
});
