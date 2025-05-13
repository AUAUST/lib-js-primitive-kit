import { identity } from "@auaust/primitive-kit/functions";

import { describe, expect, it } from "vitest";

describe("identity()", () => {
  it("should work", () => {
    expect(identity).toBeTypeOf("function");
  });
});
