import { notAll } from "@auaust/primitive-kit/booleans";

import { describe, expect, it } from "vitest";

describe("notAll()", () => {
  it("should work", () => {
    expect(notAll).toBeTypeOf("function");
  });
});
