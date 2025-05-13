import { toReversed } from "@auaust/primitive-kit/arrays";

import { describe, expect, it } from "vitest";

describe("toReversed()", () => {
  it("should work", () => {
    const input = [1, 2, 3];
    const output = toReversed(input);

    expect(output).toEqual([3, 2, 1]);
    expect(output).not.toBe(input);
  });

  it("should convert non-array values to arrays", () => {
    expect(toReversed(3)).toEqual([, , ,]);
    expect(toReversed("foo")).toEqual(["o", "o", "f"]);
    expect(toReversed(new Set([1, 2, 3]))).toEqual([3, 2, 1]);
  });
});
