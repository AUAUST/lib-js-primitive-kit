import { remainder } from "@auaust/primitive-kit/numbers";

import { describe, expect, it } from "vitest";

describe("remainder()", () => {
  it("should work", () => {
    expect(remainder).toBeTypeOf("function");
  });
});
