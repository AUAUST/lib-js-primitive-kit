import { toCustomCase } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("toCustomCase()", () => {
  it("should work", () => {
    expect(toCustomCase).toBeTypeOf("function");
  });
});
