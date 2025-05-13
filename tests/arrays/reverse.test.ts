import { reverse } from "@auaust/primitive-kit/arrays";

import { describe, expect, it } from "vitest";

describe("reverse()", () => {
  it("should work", () => {
    const input = [1, 2, 3];
    const output = reverse(input);

    expect(input).toEqual([3, 2, 1]);
    expect(output).toBe(input);
  });

  it("should throw for non-array values", () => {
    const nonArray = [
      null,
      undefined,
      3,
      {},
      "foo",
      new Set([1, 2, 3]),
      new Map([
        [1, 2],
        [3, 4],
      ]),
    ];

    for (const item of nonArray) {
      // @ts-expect-error
      expect(() => reverse(item)).toThrow(TypeError);
    }
  });
});
