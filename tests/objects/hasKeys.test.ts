import { hasKeys } from "@auaust/primitive-kit/objects";

import { describe, expect, it } from "vitest";

describe("hasKeys()", () => {
  it("should work", () => {
    expect(hasKeys).toBeTypeOf("function");
  });
});
