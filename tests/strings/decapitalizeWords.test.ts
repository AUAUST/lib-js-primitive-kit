import { decapitalizeWords } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("decapitalizeWords()", () => {
  it("should work", () => {
    expect(decapitalizeWords).toBeTypeOf("function");
  });
});
