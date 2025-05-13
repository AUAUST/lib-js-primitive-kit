import { capitalizeWords } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("capitalizeWords()", () => {
  it("should work", () => {
    expect(capitalizeWords).toBeTypeOf("function");
  });
});
