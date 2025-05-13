import { ensureEnd } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("ensureEnd()", () => {
  it("should work", () => {
    expect(ensureEnd).toBeTypeOf("function");
  });
});
