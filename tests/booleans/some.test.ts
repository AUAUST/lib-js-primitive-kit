import { some } from "@auaust/primitive-kit/booleans";

import { describe, expect, it } from "vitest";

describe("some()", () => {
  it("should work", () => {
    expect(some).toBeTypeOf("function");
  });
});
