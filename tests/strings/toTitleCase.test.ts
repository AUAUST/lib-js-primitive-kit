import { toTitleCase } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("toTitleCase()", () => {
  it("should work", () => {
    expect(toTitleCase).toBeTypeOf("function");
  });
});
