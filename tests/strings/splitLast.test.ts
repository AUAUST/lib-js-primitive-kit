import { splitLast } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("splitLast()", () => {
  it("should work", () => {
    expect(splitLast).toBeTypeOf("function");
  });
});
