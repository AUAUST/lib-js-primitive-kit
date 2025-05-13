import { shuffle } from "@auaust/primitive-kit/arrays";

import { describe, expect, it } from "vitest";

describe("shuffle()", () => {
  it("should work", () => {
    expect(shuffle).toBeTypeOf("function");
  });
});
