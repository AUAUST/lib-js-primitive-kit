import { toKebabCase } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("toKebabCase()", () => {
  it("should work", () => {
    expect(toKebabCase).toBeTypeOf("function");
  });
});
