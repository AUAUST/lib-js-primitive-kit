import { randomInteger } from "@auaust/primitive-kit/numbers";

import { describe, expect, it } from "vitest";

describe("randomInteger()", () => {
  it("should work", () => {
    expect(randomInteger).toBeTypeOf("function");
  });
});
