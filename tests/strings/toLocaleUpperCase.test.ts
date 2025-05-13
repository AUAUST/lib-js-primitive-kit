import { toLocaleUpperCase } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("toLocaleUpperCase()", () => {
  it("should work", () => {
    expect(toLocaleUpperCase).toBeTypeOf("function");
  });
});
