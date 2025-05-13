import { decapitalize } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("decapitalize()", () => {
  it("should work", () => {
    expect(decapitalize).toBeTypeOf("function");
  });
});
