import { all } from "@auaust/primitive-kit/booleans";

import { describe, expect, it } from "vitest";

describe("all()", () => {
  it("should work", () => {
    expect(all).toBeTypeOf("function");
  });
});
