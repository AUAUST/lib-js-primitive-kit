import { toLowerCase } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("toLowerCase()", () => {
  it("should work", () => {
    expect(toLowerCase).toBeTypeOf("function");
  });
});
