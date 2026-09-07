import { toSorted } from "@auaust/primitive-kit/arrays";

import type { Equal, Expect } from "type-testing";
import { expect, test } from "vitest";

test("toSorted() works", () => {
  {
    const input = [3, 1, 2];
    const output = toSorted(input);

    expect(output).toEqual([1, 2, 3]);
    expect(output).not.toBe(input);

    type Test = Expect<Equal<typeof output, number[]>>;
  }
  {
    const input = [3, 1, 2];
    const output = toSorted(input, (a, b) => b - a);

    expect(output).toEqual([3, 2, 1]);
    expect(output).not.toBe(input);

    type Test = Expect<Equal<typeof output, number[]>>;
  }
});
