import { keyBy } from "@auaust/primitive-kit/arrays";

import { describe, expect, it } from "vitest";

describe("keyBy()", () => {
  it("should work", () => {
    expect(keyBy).toBeTypeOf("function");
  });
});
