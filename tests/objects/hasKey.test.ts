import { hasKey } from "@auaust/primitive-kit/objects";

import { describe, expect, it } from "vitest";

describe("hasKey()", () => {
  it("should work", () => {
    expect(hasKey).toBeTypeOf("function");
  });
});
