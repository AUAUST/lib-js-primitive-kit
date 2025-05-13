import { toShuffled } from "@auaust/primitive-kit/arrays";

import type { Equal, Expect } from "type-testing";
import { describe, expect, it } from "vitest";

describe("toShuffled()", () => {
  it("should work", () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
    const ref = [...input];
    const output = toShuffled(input);

    expect(input).toEqual(ref);
    expect(output).not.toBe(input);
    expect(output).toEqual(expect.arrayContaining(ref));
    expect(output).toHaveLength(ref.length);

    type Test = Expect<
      Equal<typeof output, (1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9)[]>
    >;
  });
});
