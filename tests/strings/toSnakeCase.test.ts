import { toSnakeCase } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("toSnakeCase()", () => {
  it("should work", () => {
    expect(toSnakeCase).toBeTypeOf("function");
  });
});
