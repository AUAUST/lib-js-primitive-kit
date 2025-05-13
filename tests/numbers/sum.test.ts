import { sum } from "@auaust/primitive-kit/numbers";

import { describe, expect, it } from "vitest";

describe("sum()", () => {
  it("should work", () => {
    expect(sum).toBeTypeOf("function");
  });
});
