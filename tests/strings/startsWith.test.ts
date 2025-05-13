import { startsWith } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("startsWith()", () => {
  it("should work", () => {
    expect(startsWith).toBeTypeOf("function");
  });
});
