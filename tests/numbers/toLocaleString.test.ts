import { toLocaleString } from "@auaust/primitive-kit/numbers";

import { describe, expect, it } from "vitest";

describe("toLocaleString()", () => {
  it("should work", () => {
    expect(toLocaleString).toBeTypeOf("function");
  });
});
