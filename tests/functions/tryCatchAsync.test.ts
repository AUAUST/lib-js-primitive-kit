import { tryCatchAsync } from "@auaust/primitive-kit/functions";

import { describe, expect, it } from "vitest";

describe("tryCatchAsync()", () => {
  it("should work", () => {
    expect(tryCatchAsync).toBeTypeOf("function");
  });
});
