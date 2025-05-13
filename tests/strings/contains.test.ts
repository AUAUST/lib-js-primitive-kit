import { contains } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("contains()", () => {
  it("should work", () => {
    expect(contains).toBeTypeOf("function");
  });
});
