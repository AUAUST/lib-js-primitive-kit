import { toUpperCase } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("toUpperCase()", () => {
  it("should work", () => {
    expect(toUpperCase).toBeTypeOf("function");
  });
});
