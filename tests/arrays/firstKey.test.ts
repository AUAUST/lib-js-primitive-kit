import { firstKey } from "@auaust/primitive-kit/arrays";

import { describe, expect, it } from "vitest";

describe("firstKey()", () => {
  it("should work", () => {
    expect(firstKey).toBeTypeOf("function");
  });
});
