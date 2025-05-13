import { isArray, isNotArray } from "@auaust/primitive-kit/arrays";

import type { Equal, Expect, IsNever } from "type-testing";
import { describe, expect, it } from "vitest";

describe("isArray() and isNotArray()", () => {
  it("should work", () => {
    const arrays = [[], [1, 2, 3]];

    const notArrays = [
      "foo",
      {},
      null,
      undefined,
      3,
      { 0: 1, 1: 2, length: 1 },
    ];

    for (const array of arrays) {
      expect(isArray(array)).toBe(true);
      expect(isNotArray(array)).toBe(false);
    }

    for (const array of notArrays) {
      expect(isArray(array)).toBe(false);
      expect(isNotArray(array)).toBe(true);
    }

    {
      const array = null as unknown;

      if (isArray(array)) {
        type Test = Expect<Equal<typeof array, any[]>>;
      }
    }

    {
      const array = [""];

      if (!isArray(array)) {
        type Test = Expect<IsNever<typeof array>>;
      }
    }
  });
});
