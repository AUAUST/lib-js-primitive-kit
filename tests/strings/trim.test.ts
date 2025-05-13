import { trim } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("trim()", () => {
  it("should work", () => {
    expect(trim).toBeTypeOf("function");
  });
});
