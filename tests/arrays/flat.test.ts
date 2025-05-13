import { flat } from "@auaust/primitive-kit/arrays";

import type { Equal, Expect } from "type-testing";
import { describe, expect, it } from "vitest";

describe("flat()", () => {
  it("should work", () => {
    expect(flat([1, 2, 3])).toEqual([1, 2, 3]);
    expect(flat([1, [2, [3, [4]]]])).toEqual([1, 2, [3, [4]]]);
    expect(flat([1, [2, [3, [4]]]], -1)).toEqual([1, 2, 3, 4]);
    expect(flat([1, [2, [3, [4]]]], Infinity)).toEqual([1, 2, 3, 4]);
    expect(flat([1, [2, [3, [4]]]], 2)).toEqual([1, 2, 3, [4]]);

    {
      const input = [1, [2, 3], [4, [5, 6]]];
      const output = flat(input);

      expect(output).toEqual([1, 2, 3, 4, [5, 6]]);
      expect(output).not.toBe(input);

      type Test = Expect<Equal<typeof output, (number | number[])[]>>;
    }
  });
});
