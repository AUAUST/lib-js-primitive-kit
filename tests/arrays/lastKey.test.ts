import { lastKey } from "@auaust/primitive-kit/arrays";

import { describe, expect, it } from "vitest";

describe("lastKey()", () => {
  it("should work", () => {
    expect(lastKey).toBeTypeOf("function");
  });
});
