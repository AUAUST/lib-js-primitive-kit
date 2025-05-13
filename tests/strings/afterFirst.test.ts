import { afterFirst } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("afterFirst()", () => {
  it("should work", () => {
    expect(afterFirst).toBeTypeOf("function");
  });
});
