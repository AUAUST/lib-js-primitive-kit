import { afterStart } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("afterStart()", () => {
  it("should work", () => {
    expect(afterStart).toBeTypeOf("function");
  });
});
