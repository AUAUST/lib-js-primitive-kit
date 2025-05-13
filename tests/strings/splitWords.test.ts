import { splitWords } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("splitWords()", () => {
  it("should work", () => {
    expect(splitWords).toBeTypeOf("function");
  });
});
