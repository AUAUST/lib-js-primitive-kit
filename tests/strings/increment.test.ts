import { increment } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("increment()", () => {
  it("should work", () => {
    expect(increment).toBeTypeOf("function");
  });
});
