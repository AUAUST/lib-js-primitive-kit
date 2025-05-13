import { trimStart } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("trimStart()", () => {
  it("should work", () => {
    expect(trimStart).toBeTypeOf("function");
  });
});
