import { capitalize } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("capitalize()", () => {
  it("should work", () => {
    expect(capitalize).toBeTypeOf("function");
  });
});
