import { round } from "@auaust/primitive-kit/numbers";

import { describe, expect, it } from "vitest";

describe("round()", () => {
  it("should work", () => {
    expect(round).toBeTypeOf("function");
  });
});
