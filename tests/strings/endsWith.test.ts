import { endsWith } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("endsWith()", () => {
  it("should work", () => {
    expect(endsWith).toBeTypeOf("function");
  });
});
