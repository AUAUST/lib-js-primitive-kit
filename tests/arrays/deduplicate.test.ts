import { deduplicate } from "@auaust/primitive-kit/arrays";

import { describe, expect, it } from "vitest";

describe("deduplicate()", () => {
  it("should work", () => {
    expect(deduplicate).toBeTypeOf("function");
  });
});
