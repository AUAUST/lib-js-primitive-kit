import { afterLast } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("afterLast()", () => {
  it("should work", () => {
    expect(afterLast).toBeTypeOf("function");
  });
});
