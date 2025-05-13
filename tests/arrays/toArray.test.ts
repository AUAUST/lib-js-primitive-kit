import { toArray } from "@auaust/primitive-kit/arrays";

import type { Equal, Expect } from "type-testing";
import { describe, expect, it } from "vitest";

describe("toArray()", () => {
  it("should return the same array", () => {
    const arr = [1, 2, 3];
    expect(toArray(arr)).toBe(arr);
  });

  it("should return an empty array for nullish values", () => {
    {
      const a = toArray();
      type Test = Expect<Equal<typeof a, unknown[]>>;
      expect(a).toEqual([]);
    }

    {
      const a = toArray(null);
      type Test = Expect<Equal<typeof a, unknown[]>>;
      expect(a).toEqual([]);
    }

    {
      const a = toArray(undefined);
      type Test = Expect<Equal<typeof a, unknown[]>>;
      expect(a).toEqual([]);
    }
  });

  it("should return an array of the given length for numbers", () => {
    const a = toArray(3);
    type Test = Expect<Equal<typeof a, unknown[]>>;
    expect(a).toEqual([, , ,]);
  });

  it("should return an array from an array-like object", () => {
    {
      const a = toArray({ length: 3 });
      type Test = Expect<Equal<typeof a, unknown[]>>;
      expect(a).toEqual([, , ,]);
    }

    {
      const a = toArray("foo");
      type Test = Expect<Equal<typeof a, string[]>>;
      expect(a).toEqual(["f", "o", "o"]);
    }

    {
      const a = toArray(new Set([1, 2, 3]));
      type Test = Expect<Equal<typeof a, number[]>>;
      expect(a).toEqual([1, 2, 3]);
    }
  });
});
