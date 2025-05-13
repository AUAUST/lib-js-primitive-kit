import { trimEnd } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("trimEnd()", () => {
  it("should work", () => {
    expect(trimEnd).toBeTypeOf("function");
  });
});
