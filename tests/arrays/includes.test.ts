import { includes } from "@auaust/primitive-kit/arrays";

import { describe, expect, it } from "vitest";

describe("includes()", () => {
  it("should work", () => {
    expect(includes).toBeTypeOf("function");
  });
});
