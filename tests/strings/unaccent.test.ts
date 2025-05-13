import { unaccent } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("unaccent()", () => {
  it("should work", () => {
    expect(unaccent).toBeTypeOf("function");
  });
});
