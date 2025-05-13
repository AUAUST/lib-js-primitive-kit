import { isSet } from "@auaust/primitive-kit/primitives";

import { describe, expect, it } from "vitest";

describe("isSet()", () => {
  it("should work", () => {
    expect(isSet).toBeTypeOf("function");
  });
});
