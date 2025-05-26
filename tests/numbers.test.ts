import { N } from "@auaust/primitive-kit";

import { describe, expect, it } from "vitest";

describe("N() static class", () => {
  it("should be callable without new", () => {
    expect(N(2)).toBe(2);
    expect(N("2")).toBe(2);
    expect(
      N({
        toString() {
          return "0b1010";
        },
      })
    ).toBe(10);
  });
});
