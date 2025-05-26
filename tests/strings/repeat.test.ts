import { repeat } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("repeat()", () => {
  it("should work", () => {
    expect(repeat("foo", 0)).toBe("");
    expect(repeat("foo", 1)).toBe("foo");
    expect(repeat("foo", 2)).toBe("foofoo");
    expect(repeat("foo", 3)).toBe("foofoofoo");
  });
});
