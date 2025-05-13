import { formatNumberToString } from "@auaust/primitive-kit/numbers";

import { describe, expect, it } from "vitest";

describe("formatNumberToString()", () => {
  it("should work", () => {
    expect(formatNumberToString).toBeTypeOf("function");
  });
});
