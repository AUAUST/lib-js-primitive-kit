import { wrap } from "@auaust/primitive-kit/arrays";

import type { Equal, Expect } from "type-testing";
import { describe, expect, it } from "vitest";

describe("wrap()", () => {
  it("should work", () => {
    expect(wrap(0)).toEqual([0]);
    expect(wrap("foo")).toEqual(["foo"]);
    expect(wrap(null)).toEqual([]);
    expect(wrap()).toEqual([]);

    {
      const array = [1, 2, 3];

      expect(wrap(array)).toBe(array);

      type Test = Expect<
        Equal<ReturnType<typeof wrap<typeof array>>, number[]>
      >;
    }
  });
});
