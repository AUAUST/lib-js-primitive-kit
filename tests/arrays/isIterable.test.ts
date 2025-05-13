import { isIterable } from "@auaust/primitive-kit/arrays";

import { describe, expect, it } from "vitest";

describe("isIterable()", () => {
  it("should work", () => {
    const iterable = [
      [],
      [1, 2, 3],
      "",
      "foo",
      new Set([1, 2, 3]),
      new Map([
        [1, 2],
        [3, 4],
      ]),
    ];

    const nonIterable = [{}, null, undefined, 3, new Date()];

    for (const item of iterable) {
      expect(isIterable(item)).toBe(true);
    }

    for (const item of nonIterable) {
      expect(isIterable(item)).toBe(false);
    }

    {
      const arr = [] as unknown;

      // @ts-expect-error
      for (const _ of arr) {
        // `arr` being unknown, TypeScript should complain about this.
      }

      if (isIterable(arr)) {
        for (const _ of arr) {
          // `arr` is type-guarded as an iterable, so this should work.
        }
      }
    }
  });
});
