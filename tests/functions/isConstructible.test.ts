import { isConstructible } from "@auaust/primitive-kit/functions";

import { describe, expect, it } from "vitest";

describe("isConstructible()", () => {
  it("should work", () => {
    expect(isConstructible).toBeTypeOf("function");
  });
});
