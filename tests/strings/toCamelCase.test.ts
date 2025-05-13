import { toCamelCase } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("toCamelCase()", () => {
  it("should work", () => {
    expect(toCamelCase).toBeTypeOf("function");
  });
});
