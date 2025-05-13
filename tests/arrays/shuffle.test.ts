import { shuffle } from "@auaust/primitive-kit/arrays";

import { describe, expect, it } from "vitest";

describe("shuffle()", () => {
  it("should work", () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const ref = [...input];

    expect(shuffle(input)).toEqual(expect.arrayContaining(ref));
    expect(shuffle(input)).toBe(input);
  });

  it("should throw on non-array values", () => {
    const nonArray = [null, undefined, 3, "foo", new Set([1, 2, 3]), {}];

    for (const item of nonArray) {
      // @ts-expect-error
      expect(() => shuffle(item)).toThrow(TypeError);
    }
  });
});
