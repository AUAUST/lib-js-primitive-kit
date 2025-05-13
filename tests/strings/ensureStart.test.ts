import { ensureStart } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("ensureStart()", () => {
  it("should work", () => {
    expect(ensureStart).toBeTypeOf("function");
  });
});
