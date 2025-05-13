import { toPascalCase } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("toPascalCase()", () => {
  it("should work", () => {
    expect(toPascalCase).toBeTypeOf("function");
  });
});
