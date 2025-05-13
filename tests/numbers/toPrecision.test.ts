import { toPrecision } from "@auaust/primitive-kit/numbers";

import { describe, expect, it } from "vitest";

describe("toPrecision()", () => {
  it("should work", () => {
    expect(toPrecision).toBeTypeOf("function");
  });
});
